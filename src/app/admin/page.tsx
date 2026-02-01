"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, CheckCircle, XCircle, Eye, Download, User, Mail, Phone, GraduationCap, Award, FileText } from "lucide-react";
import styles from "./Admin.module.scss";

interface Therapist {
  id: string;
  name: string;
  email: string;
  created_at: string;
  license_number: string;
  license_state: string;
  years_of_experience: number;
  specialization?: string;
  phone: string;
  college_degree: string;
  masters_institution: string;
  psychologist_type: string;
  successful_cases: number;
  dsm_awareness: string;
  therapy_types: string;
  certificate_image_path: string;
  degree_image_path: string;
  is_approved: boolean;
}

import { api } from "../lib/api";

export default function AdminDashboard() {
  const [pendingTherapists, setPendingTherapists] = useState<Therapist[]>([]);
  const [approvedTherapists, setApprovedTherapists] = useState<Therapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    setIsLoading(true);
    try {
      const [pendingData, approvedData] = await Promise.all([
        api.getPendingTherapists(),
        api.getApprovedTherapists(),
      ]);

      if (pendingData.success) {
        setPendingTherapists(pendingData.therapists || []);
      }
      if (approvedData.success) {
        setApprovedTherapists(approvedData.therapists || []);
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!confirm("Are you sure you want to approve this therapist?")) return;

    try {
      const data = await api.approveTherapist(id);
      if (data.success) {
        alert("Therapist approved successfully!");
        fetchTherapists();
        setSelectedTherapist(null);
      } else {
        alert("Failed to approve therapist");
      }
    } catch (error) {
      console.error("Error approving therapist:", error);
      alert("Failed to approve therapist");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this therapist application? This action cannot be undone.")) return;

    try {
      const data = await api.rejectTherapist(id);
      if (data.success) {
        alert("Therapist application rejected");
        fetchTherapists();
        setSelectedTherapist(null);
      } else {
        alert("Failed to reject therapist");
      }
    } catch (error) {
      console.error("Error rejecting therapist:", error);
      alert("Failed to reject therapist");
    }
  };

  const therapists = activeTab === "pending" ? pendingTherapists : approvedTherapists;

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Shield className={styles.headerIcon} />
          <h1 className={styles.title}>Admin Dashboard</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "pending" ? styles.active : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Applications ({pendingTherapists.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === "approved" ? styles.active : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved Therapists ({approvedTherapists.length})
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading therapists...</div>
        ) : therapists.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No {activeTab === "pending" ? "pending" : "approved"} therapists found.</p>
          </div>
        ) : (
          <div className={styles.therapistGrid}>
            {therapists.map((therapist) => (
              <Card key={therapist.id} className={styles.therapistCard}>
                <CardHeader>
                  <CardTitle className={styles.cardTitle}>
                    <User className={styles.icon} />
                    {therapist.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={styles.info}>
                    <div className={styles.infoItem}>
                      <Mail className={styles.infoIcon} />
                      <span>{therapist.email}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <Phone className={styles.infoIcon} />
                      <span>{therapist.phone}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <Award className={styles.infoIcon} />
                      <span>{therapist.license_number} ({therapist.license_state})</span>
                    </div>
                    <div className={styles.infoItem}>
                      <GraduationCap className={styles.infoIcon} />
                      <span>{therapist.college_degree}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Experience:</span>
                      <span>{therapist.years_of_experience} years</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Type:</span>
                      <span>{therapist.psychologist_type}</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTherapist(therapist)}
                      className={styles.viewButton}
                    >
                      <Eye className={styles.buttonIcon} />
                      View Details
                    </Button>
                    {activeTab === "pending" && (
                      <>
                        <Button
                          variant="default"
                          onClick={() => handleApprove(therapist.id)}
                          className={styles.approveButton}
                        >
                          <CheckCircle className={styles.buttonIcon} />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(therapist.id)}
                          className={styles.rejectButton}
                        >
                          <XCircle className={styles.buttonIcon} />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedTherapist && (
        <div className={styles.modal} onClick={() => setSelectedTherapist(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Therapist Details</h2>
              <button className={styles.closeButton} onClick={() => setSelectedTherapist(null)}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <h3>Personal Information</h3>
                <div className={styles.detailGrid}>
                  <div><strong>Name:</strong> {selectedTherapist.name}</div>
                  <div><strong>Email:</strong> {selectedTherapist.email}</div>
                  <div><strong>Phone:</strong> {selectedTherapist.phone}</div>
                  <div><strong>Applied:</strong> {new Date(selectedTherapist.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>License Information</h3>
                <div className={styles.detailGrid}>
                  <div><strong>License Number:</strong> {selectedTherapist.license_number}</div>
                  <div><strong>License State:</strong> {selectedTherapist.license_state}</div>
                  <div><strong>Years of Experience:</strong> {selectedTherapist.years_of_experience}</div>
                  <div><strong>Specialization:</strong> {selectedTherapist.specialization || "N/A"}</div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Education</h3>
                <div className={styles.detailGrid}>
                  <div><strong>College Degree:</strong> {selectedTherapist.college_degree}</div>
                  <div><strong>Master's Institution:</strong> {selectedTherapist.masters_institution}</div>
                  <div><strong>Psychologist Type:</strong> {selectedTherapist.psychologist_type}</div>
                  <div><strong>Successful Cases:</strong> {selectedTherapist.successful_cases}</div>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Professional Details</h3>
                <div className={styles.detailItem}>
                  <strong>DSM Awareness:</strong>
                  <p>{selectedTherapist.dsm_awareness}</p>
                </div>
                <div className={styles.detailItem}>
                  <strong>Therapy Types:</strong>
                  <p>{selectedTherapist.therapy_types}</p>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Documents</h3>
                <div className={styles.documents}>
                  <div className={styles.document}>
                    <FileText className={styles.documentIcon} />
                    <strong>Certificate/License</strong>
                    {selectedTherapist.certificate_image_path ? (
                      <div className={styles.documentPreview}>
                        <img
                          src={selectedTherapist.certificate_image_path}
                          alt="Certificate"
                          className={styles.documentImage}
                        />
                        <a
                          href={selectedTherapist.certificate_image_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadLink}
                        >
                          <Download className={styles.downloadIcon} />
                          View Full Size
                        </a>
                      </div>
                    ) : (
                      <p className={styles.noDocument}>No certificate uploaded</p>
                    )}
                  </div>
                  <div className={styles.document}>
                    <FileText className={styles.documentIcon} />
                    <strong>College Degree</strong>
                    {selectedTherapist.degree_image_path ? (
                      <div className={styles.documentPreview}>
                        <img
                          src={selectedTherapist.degree_image_path}
                          alt="Degree"
                          className={styles.documentImage}
                        />
                        <a
                          href={selectedTherapist.degree_image_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadLink}
                        >
                          <Download className={styles.downloadIcon} />
                          View Full Size
                        </a>
                      </div>
                    ) : (
                      <p className={styles.noDocument}>No degree uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              {!selectedTherapist.is_approved && (
                <div className={styles.modalActions}>
                  <Button
                    variant="default"
                    onClick={() => {
                      handleApprove(selectedTherapist.id);
                      setSelectedTherapist(null);
                    }}
                    className={styles.approveButton}
                  >
                    <CheckCircle className={styles.buttonIcon} />
                    Approve Application
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedTherapist.id);
                      setSelectedTherapist(null);
                    }}
                    className={styles.rejectButton}
                  >
                    <XCircle className={styles.buttonIcon} />
                    Reject Application
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

