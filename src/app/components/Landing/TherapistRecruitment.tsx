import { Heart, Users, Award } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./scss/TherapistRecruitment.module.scss";

export default function TherapistRecruitment() {
  const features = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Help people transform their lives and find healing",
    },
    {
      icon: Users,
      title: "Growing Community",
      description: "Join thousands of mental health professionals",
    },
    {
      icon: Award,
      title: "Professional Growth",
      description: "Access continued education and development resources",
    },
  ];

  return (
    <section className={styles.therapistRecruitment}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Are You a Licensed Therapist?</h2>
          <p className={styles.mission}>
            Join our mission to make mental health accessible. Help us create a world where everyone has access to compassionate, professional mental health support.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaSection}>
          <Button className={styles.ctaButton}>Become a Helper</Button>
          <p className={styles.disclaimer}>
            Licensed professionals only • Application review required
          </p>
        </div>
      </div>
    </section>
  );
}

