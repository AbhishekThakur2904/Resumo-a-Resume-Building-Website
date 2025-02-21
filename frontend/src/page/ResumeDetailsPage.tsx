import React, { useEffect, useRef, useState } from "react";
import { useGetResumeByIdQuery, useSendFileMutation } from "../services/api";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

type Props = {};
type ResumeData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  education: {
    _id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    _id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  title: string;
};

const ResumeDetailsPage = (props: Props) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetResumeByIdQuery(id);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [sendFile] = useSendFileMutation();
  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography color="error">
          Failed to load the resume details. Please try again later.
        </Typography>
      </Box>
    );
  }

  const { personalInfo, education, experience, skills, title } =
    data.data as ResumeData;

  const generateSmallerPDFBlob = () => {
    return new Promise<Blob>((resolve, reject) => {
      if (resumeRef.current) {
        html2canvas(resumeRef.current, {
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          scale: 1.5, // Reduce scale for smaller size (lower than 3)
        })
          .then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.width;
            const pageHeight = pdf.internal.pageSize.height;

            const imgData = canvas.toDataURL("image/jpeg", 0.5); // Use jpeg with lower quality for smaller size

            // Adjust image size to fit the page while keeping the aspect ratio
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

            // Get the PDF as Blob and resolve the promise
            const pdfBlob = pdf.output("blob");
            resolve(pdfBlob);
          })
          .catch(reject);
      }
    });
  };

  const sendEmailWithAttachment = async () => {
    try {
      const pdfBlob = await generateSmallerPDFBlob();

      const formData = new FormData();
      formData.append("file", pdfBlob, "resume.pdf");
      formData.append("email", personalInfo.email);
      formData.append("subject", `Resume - ${personalInfo.fullName}`);
      formData.append(
        "html",
        `
        Hi,

        I hope this message finds you well. Please find attached my resume for your reference.

        Best regards,
        ${personalInfo?.fullName}
      `
      );

      // Send the file using the sendFile mutation
      const res = await sendFile(formData).unwrap();
      console.log(res);

      toast.success("Resume sent successfully!");
    } catch (error) {
      console.error("Error sending resume via email", error);
      alert("Failed to send the resume.");
    }
  };
  const downloadPDF = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current, {
        useCORS: true, // Allow cross-origin image sources
        scrollX: 0,
        scrollY: -window.scrollY, // Ensure the page scroll doesn't affect the image capture
        scale: 3, // Increase resolution of the canvas
      }).then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");

        // Set the page size to A4 without margins
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;

        const imgData = canvas.toDataURL("image/png");

        // Add image to PDF, setting it to fit the full page width and height
        pdf.addImage(
          imgData,
          "PNG",
          0, // x-position
          0, // y-position
          pageWidth, // width
          (canvas.height * pageWidth) / canvas.width // height to maintain aspect ratio
        );

        // Save PDF without margins
        pdf.save("resume.pdf");
      });
    }
  };
  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
      ref={resumeRef}
    >
      {/* Resume Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="#333">
          {personalInfo?.fullName}
        </Typography>
        <Typography variant="body1" color="gray">
          {personalInfo?.email} | {personalInfo?.phone} |{" "}
          {personalInfo?.address}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Education Section */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#333" mb={2}>
          Education
        </Typography>
        {education?.map((edu: any) => (
          <Box key={edu._id} mb={2}>
            <Typography variant="body1" fontWeight="bold">
              {edu.degree} at {edu.school}
            </Typography>
            <Typography variant="body2" color="gray">
              {new Date(edu.startDate).toLocaleDateString()} -{" "}
              {new Date(edu.endDate).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Experience Section */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#333" mb={2}>
          Professional Experience
        </Typography>
        {experience?.map((exp: any) => (
          <Box key={exp._id} mb={2}>
            <Typography variant="body1" fontWeight="bold">
              {exp.position} at {exp.company}
            </Typography>
            <Typography variant="body2" color="gray">
              {new Date(exp.startDate).toLocaleDateString()} -{" "}
              {new Date(exp.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" mt={1}>
              {exp.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" color="#333" mb={2}>
          Skills
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {skills?.map((skill: string, index: number) => (
            <Box
              key={index}
              sx={{
                padding: "4px 8px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {skill}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Export Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={openMenu}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            position: "absolute",
            right: "10px",
            top: "100px",
          }}
        >
          Export
        </Button>

        {/* Menu for Export Options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={downloadPDF}>Download as PDF</MenuItem>
          <MenuItem onClick={sendEmailWithAttachment}>Send as Email</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ResumeDetailsPage;
