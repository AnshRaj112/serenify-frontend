"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Heart, ArrowRight, Shield, Users, Sparkles, Eye, EyeOff, ArrowLeft } from "lucide-react";
import styles from "./Signup.module.scss";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate step 1 fields
    if (formData.name && formData.email && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added when backend is ready
    console.log("Signup form submitted", formData);
  };

  return (
    <div className={styles.signupPage}>
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
                Your Journey to <span className={styles.highlight}>Wellness</span> Begins Here
              </h2>
              
              <p className={styles.storyDescription}>
                Every step forward is a victory. Every conversation is progress. 
                Join thousands who have found their path to healing and growth.
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <Shield className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Secure & Private</h3>
                    <p className={styles.featureText}>Your data is encrypted and protected</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Users className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Expert Therapists</h3>
                    <p className={styles.featureText}>Licensed professionals ready to help</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Sparkles className={styles.featureIcon} />
                  <div>
                    <h3 className={styles.featureTitle}>Personalized Care</h3>
                    <p className={styles.featureText}>Tailored to your unique needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <Card className={styles.formCard}>
              <CardHeader>
                {/* Step Indicator */}
                <div className={styles.stepIndicator}>
                  <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ""}`}>
                    <div className={styles.stepNumber}>1</div>
                    <span className={styles.stepLabel}>Account Details</span>
                  </div>
                  <div className={`${styles.stepLine} ${currentStep >= 2 ? styles.active : ""}`}></div>
                  <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ""}`}>
                    <div className={styles.stepNumber}>2</div>
                    <span className={styles.stepLabel}>Address</span>
                  </div>
                </div>

                <CardTitle className={styles.formTitle}>
                  {currentStep === 1 ? "Create Your Account" : "Add Your Address"}
                </CardTitle>
                <p className={styles.formSubtitle}>
                  {currentStep === 1
                    ? "Start your healing journey today. It only takes a minute."
                    : "Help us connect you with local therapists if needed."}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={currentStep === 1 ? handleNext : handleSubmit} className={styles.form}>
                  {currentStep === 1 ? (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={styles.input}
                        />
                      </div>

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
                            placeholder="Create a strong password"
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

                      <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>
                          Confirm Password
                        </label>
                        <div className={styles.passwordWrapper}>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className={styles.input}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={styles.eyeButton}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className={styles.eyeIcon} />
                            ) : (
                              <Eye className={styles.eyeIcon} />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        variant="healing" 
                        className={styles.submitButton}
                        size="lg"
                      >
                        Continue
                        <ArrowRight className={styles.buttonIcon} />
                      </Button>

                      <div className={styles.divider}>
                        <span>or</span>
                      </div>

                      <Link href="/therapist-signup" className={styles.therapistLink}>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className={styles.therapistButton}
                          size="lg"
                        >
                          Sign Up as Therapist
                        </Button>
                      </Link>

                      <p className={styles.loginLink}>
                        Already have an account?{" "}
                        <Link href="/signin" className={styles.link}>
                          Sign In
                        </Link>
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={styles.formGroup}>
                        <label htmlFor="street" className={styles.label}>
                          Street Address
                        </label>
                        <Input
                          id="street"
                          name="street"
                          type="text"
                          placeholder="123 Main Street"
                          value={formData.street}
                          onChange={handleChange}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.addressRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="city" className={styles.label}>
                            City
                          </label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className={styles.input}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="state" className={styles.label}>
                            State/Province
                          </label>
                          <Input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.addressRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="zipCode" className={styles.label}>
                            ZIP/Postal Code
                          </label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            placeholder="12345"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className={styles.input}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="country" className={styles.label}>
                            Country
                          </label>
                          <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.buttonGroup}>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className={styles.backButton}
                          size="lg"
                          onClick={handleBack}
                        >
                          <ArrowLeft className={styles.buttonIcon} />
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          variant="healing" 
                          className={styles.submitButton}
                          size="lg"
                        >
                          Create Account
                          <ArrowRight className={styles.buttonIcon} />
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

