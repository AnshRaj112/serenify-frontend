"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Heart, Send, MessageSquare, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { api, ApiError, Vent } from "../lib/api";
import styles from "./Vent.module.scss";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function VentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [vents, setVents] = useState<Vent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  // Calculate how many messages fit on screen (estimate: ~100px per message)
  const calculateInitialChunkSize = () => {
    if (typeof window === "undefined") return 20;
    const viewportHeight = window.innerHeight;
    const estimatedMessageHeight = 100; // Average height per message
    const headerHeight = 200; // Approximate header height
    const inputAreaHeight = 120; // Approximate input area height
    const availableHeight = viewportHeight - headerHeight - inputAreaHeight;
    const estimatedMessages = Math.ceil(availableHeight / estimatedMessageHeight);
    return Math.max(10, Math.min(estimatedMessages, 30)); // Between 10 and 30 messages
  };

  // Check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData && userData.trim()) {
        try {
          // Validate that it looks like JSON before parsing
          const trimmed = userData.trim();
          if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsLoggedIn(true);
          } else {
            console.error("Invalid user data format, clearing localStorage");
            localStorage.removeItem("user");
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
          // Clear invalid data
          localStorage.removeItem("user");
        }
      } else {
        // Show auth prompt popup for new users after a short delay
        const timer = setTimeout(() => {
          setShowAuthPrompt(true);
        }, 500);
        return () => clearTimeout(timer);
      }

      // For non-logged-in users, load from sessionStorage
      if (!userData || !userData.trim()) {
        const sessionVents = sessionStorage.getItem("vent_messages");
        if (sessionVents && sessionVents.trim()) {
          try {
            // Validate that it looks like JSON before parsing
            const trimmed = sessionVents.trim();
            if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
              const parsedVents = JSON.parse(sessionVents);
              if (Array.isArray(parsedVents)) {
                setVents(parsedVents);
              }
            } else {
              console.error("Invalid session vents format, clearing sessionStorage");
              sessionStorage.removeItem("vent_messages");
            }
          } catch (e) {
            console.error("Error parsing session vents:", e);
            // Clear invalid data
            sessionStorage.removeItem("vent_messages");
          }
        }
      }

      // Clear session storage on window close for non-logged-in users
      const handleBeforeUnload = () => {
        if (!userData) {
          sessionStorage.removeItem("vent_messages");
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);

  // Load initial vents for logged-in users
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      loadVents(0, true);
    }
  }, [isLoggedIn, user?.id, loadVents]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadVents = useCallback(async (skipValue: number, isInitial: boolean = false) => {
    if (!isLoggedIn || !user?.id) return;

    try {
      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const chunkSize = isInitial ? calculateInitialChunkSize() : calculateInitialChunkSize();
      const response = await api.getVents(user.id, chunkSize, skipValue);
      if (response.success) {
        // Backend returns newest first, but we want newest at bottom
        // So we reverse the array for display
        const reversedVents = [...response.vents].reverse();
        
        if (isInitial) {
          setVents(reversedVents);
          // Scroll to bottom after initial load
          setTimeout(() => scrollToBottom(), 100);
        } else {
          // When loading more (older messages), prepend them (they're already older)
          const previousScrollHeight = messagesAreaRef.current?.scrollHeight || 0;
          setVents((prev) => [...reversedVents, ...prev]);
          // Maintain scroll position after prepending
          setTimeout(() => {
            if (messagesAreaRef.current) {
              const newScrollHeight = messagesAreaRef.current.scrollHeight;
              messagesAreaRef.current.scrollTop = newScrollHeight - previousScrollHeight;
            }
          }, 0);
        }
        setHasMore(response.has_more);
        setSkip(skipValue + response.vents.length);
      }
    } catch (err) {
      console.error("Error loading vents:", err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [isLoggedIn, user?.id]);

  // Intersection Observer for infinite scroll (load more when scrolling up)
  useEffect(() => {
    if (!isLoggedIn || !hasMore || isLoadingMore) return;

    const currentRef = loadingMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadVents(skip, false);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoadingMore, skip, isLoggedIn, loadVents]);

  // Also handle scroll to top for loading more
  useEffect(() => {
    if (!isLoggedIn || !hasMore || isLoadingMore) return;

    const messagesArea = messagesAreaRef.current;
    if (!messagesArea) return;

    const handleScroll = () => {
      // Load more when near the top (within 200px)
      if (messagesArea.scrollTop < 200 && hasMore && !isLoadingMore) {
        loadVents(skip, false);
      }
    };

    messagesArea.addEventListener("scroll", handleScroll);
    return () => messagesArea.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoadingMore, skip, isLoggedIn, loadVents]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Show auth modal for non-logged-in users
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsSending(true);
    const messageText = message;
    setMessage("");

    try {
      const response = await api.createVent({
        message: messageText,
        user_id: user?.id,
      });

      if (response.success && response.vent) {
        const newVent: Vent = {
          id: response.vent.id,
          message: response.vent.message,
          created_at: response.vent.created_at,
          user_id: response.vent.user_id,
        };
        // Add new message at the end (newest at bottom)
        setVents((prev) => [...prev, newVent]);
      }
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Error sending vent:", apiError);
      alert(apiError.message || "Failed to send message. Please try again.");
      setMessage(messageText); // Restore message on error
    } finally {
      setIsSending(false);
    }
  };

  const handleSendAsGuest = () => {
    if (!message.trim()) return;

    const newVent: Vent = {
      id: `guest_${Date.now()}`,
      message: message,
      created_at: new Date().toISOString(),
    };

    const updatedVents = [newVent, ...vents];
    setVents(updatedVents);
    setMessage("");

    // Save to sessionStorage
    sessionStorage.setItem("vent_messages", JSON.stringify(updatedVents));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isLoggedIn) {
        handleSend();
      } else {
        handleSendAsGuest();
      }
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Clear user state
    setUser(null);
    setIsLoggedIn(false);
    // Clear vents (they're user-specific)
    setVents([]);
    // Optionally redirect to home or stay on page
    // router.push("/");
  };

  return (
    <div className={styles.ventPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIcon}>
                <Heart className={styles.heartIcon} />
              </div>
              <h1 className={styles.brandName}>Serenify</h1>
            </div>
            {isLoggedIn && (
              <div className={styles.userSection}>
                <span className={styles.userName}>Welcome, {user?.name || 'User'}</span>
                <Button
                  variant="healing"
                  size="default"
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  <LogOut className={styles.logoutIcon} />
                  Log Out
                </Button>
              </div>
            )}
          </div>
          <h2 className={styles.pageTitle}>
            Vent Till Your <span className={styles.highlight}>Heart&apos;s Content</span>
          </h2>
          <p className={styles.pageDescription}>
            This is your safe space. Express yourself freely, without judgment.
            {!isLoggedIn && " Your messages will be cleared when you close this window."}
          </p>
        </div>

        <div className={styles.chatContainer} ref={chatContainerRef}>
          <div className={styles.messagesArea} ref={messagesAreaRef}>
            {isLoading && (
              <div className={styles.loadingMessage}>Loading your messages...</div>
            )}

            {!isLoading && vents.length === 0 && (
              <div className={styles.emptyState}>
                <MessageSquare className={styles.emptyIcon} />
                <p>No messages yet. Start venting to express yourself!</p>
              </div>
            )}

            {isLoadingMore && (
              <div ref={loadingMoreRef} className={styles.loadingMore}>
                Loading more messages...
              </div>
            )}

            {vents.map((vent) => (
              <div key={vent.id} className={styles.message}>
                <div className={styles.messageContent}>{vent.message}</div>
                <div className={styles.messageTime}>
                  {new Date(vent.created_at).toLocaleString()}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <textarea
              className={styles.messageInput}
              placeholder="Type your message here... (Press Enter to send)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />
            <Button
              onClick={isLoggedIn ? handleSend : handleSendAsGuest}
              disabled={!message.trim() || isSending}
              variant="healing"
              className={styles.sendButton}
            >
              <Send className={styles.sendIcon} />
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Prompt Popup for new users */}
      {showAuthPrompt && !isLoggedIn && (
        <div className={styles.modal} onClick={() => setShowAuthPrompt(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Save Your Messages Permanently</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowAuthPrompt(false)}
                aria-label="Close"
              >
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalText}>
                Want to save your vent messages permanently? Sign in or create an account to keep your messages safe.
                <br /><br />
                You can continue as a guest, but your messages will be cleared when you close this window.
              </p>
              <div className={styles.modalActions}>
                <Link href="/signin">
                  <Button variant="healing" className={styles.modalButton}>
                    <LogIn className={styles.authIcon} />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="healing" className={styles.modalButton}>
                    <UserPlus className={styles.authIcon} />
                    Sign Up
                  </Button>
                </Link>
                <Button
                  variant="healing"
                  className={styles.modalButton}
                  onClick={() => setShowAuthPrompt(false)}
                >
                  Continue as Guest
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal for when trying to send without login */}
      {showAuthModal && (
        <div className={styles.modal} onClick={() => setShowAuthModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Sign In to Save Your Messages</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowAuthModal(false)}
                aria-label="Close"
              >
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalText}>
                To save your vent messages permanently, please sign in or create an account.
                You can continue as a guest, but your messages will be cleared when you close this window.
              </p>
              <div className={styles.modalActions}>
                <Link href="/signin">
                  <Button variant="healing" className={styles.modalButton}>
                    <LogIn className={styles.authIcon} />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="healing" className={styles.modalButton}>
                    <UserPlus className={styles.authIcon} />
                    Sign Up
                  </Button>
                </Link>
                <Button
                  variant="healing"
                  className={styles.modalButton}
                  onClick={() => {
                    setShowAuthModal(false);
                    handleSendAsGuest();
                  }}
                >
                  Continue as Guest
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

