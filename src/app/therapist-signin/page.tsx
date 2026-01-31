"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Heart, ArrowRight, Shield, Users, Award, LogIn, Eye, EyeOff } from "lucide-react";
import styles from "./TherapistSignin.module.scss";

export default function TherapistSigninPage() {
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
    console.log("Therapist signin form submitted", formData);
  };

  return (
    <div className={styles.therapistSigninPage}>
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
                Welcome <span className={styles.highlight}>Back</span>, Therapist
              </h2>
              
              <p className={styles.storyDescription}>
                Your journey to help others continues here. Sign in to access your dashboard, 
                manage your clients, and continue making a difference in people&apos;s lives.
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <Shield className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Your Professional Dashboard</h3>
                    <p className={styles.featureText}>Access all your tools and resources</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Users className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Manage Your Clients</h3>
                    <p className={styles.featureText}>Continue supporting those in your care</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Award className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Track Your Impact</h3>
                    <p className={styles.featureText}>See the difference you&apos;re making</p>
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
                    <Link href="/therapist-forgot-password" className={styles.forgotLink}>
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

                  <p className={styles.signupLink}>
                    Don&apos;t have an account?{" "}
                    <Link href="/therapist-signup" className={styles.link}>
                      Apply Now
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

