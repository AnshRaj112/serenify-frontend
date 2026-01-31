"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Heart, ArrowRight, Shield, Users, Sparkles, LogIn, Eye, EyeOff } from "lucide-react";
import styles from "./Signin.module.scss";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added when backend is ready
    console.log("Signin form submitted", formData);
  };

  return (
    <div className={styles.signinPage}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Story Section */}
          <div className={styles.storySection}>
            <div className={styles.storyContent}>
              <div className={styles.logoWrapper}>
                <div className={styles.logoIcon}>
                  <Heart className={styles.heartIcon} />
                </div>
                <h1 className={styles.brandName}>Serenify</h1>
              </div>
              
              <h2 className={styles.storyTitle}>
                Welcome <span className={styles.highlight}>Back</span>
              </h2>
              
              <p className={styles.storyDescription}>
                Your journey continues here. We&apos;re here to support you every step of the way. 
                Sign in to reconnect with your therapist and continue your path to wellness.
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <Shield className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Your Safe Space</h3>
                    <p className={styles.featureText}>All your conversations are secure and private</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Users className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Continue Your Journey</h3>
                    <p className={styles.featureText}>Pick up right where you left off</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Sparkles className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Track Your Progress</h3>
                    <p className={styles.featureText}>See how far you&apos;ve come</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <Card className={styles.formCard}>
              <CardHeader>
                <CardTitle className={styles.formTitle}>Sign In to Your Account</CardTitle>
                <p className={styles.formSubtitle}>
                  Welcome back! We&apos;re glad you&apos;re here.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                      Password
                    </label>
                    <div className={styles.passwordWrapper}>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.eyeButton}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className={styles.eyeIcon} />
                        ) : (
                          <Eye className={styles.eyeIcon} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={styles.forgotPassword}>
                    <Link href="/forgot-password" className={styles.forgotLink}>
                      Forgot your password?
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    variant="healing" 
                    className={styles.submitButton}
                    size="lg"
                  >
                    <LogIn className={styles.buttonIcon} />
                    Sign In
                    <ArrowRight className={styles.buttonIcon} />
                  </Button>

                  <div className={styles.divider}>
                    <span>or</span>
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className={styles.therapistButton}
                    size="lg"
                  >
                    Sign In as Therapist
                  </Button>

                  <p className={styles.signupLink}>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className={styles.link}>
                      Create Account
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

