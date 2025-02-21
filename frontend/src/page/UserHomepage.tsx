import { useDeleteResumeMutation, useMyResumeQuery } from "../services/api";
import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
type Props = {};
export interface IResume {
  _id: string;
  userId: string;
  title: string;
  personalInfo: any;
  education: any;
  experience: any;
  skills: any;
}

const AdminHomepage: React.FC<Props> = (props) => {
  const { data, isLoading, error, refetch } = useMyResumeQuery({});
  const [deleteResume] = useDeleteResumeMutation();
  console.log(data);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Your Resume Listings
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Skeleton loading for each resume item */}
          {[...Array(4)].map((_, index) => (
            <Box
              key={index}
              sx={{
                height: "15rem",
                width: "12rem",
                border: "2px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                color: "black",
                flexDirection: "column",
                padding: 2,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="rectangular" width="90%" height={40} />
              <Skeleton variant="text" width="50%" height={20} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return <Typography>Error loading resume data!</Typography>;
  }

  if (!data) {
    return <Typography>No resume data found!</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Resume Listings
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {data?.data?.map((item: IResume) => (
          <Box
            component={Link}
            to={`/resume/${item._id}`}
            sx={{
              height: "15rem",
              width: "12rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
              color: "black",
              flexDirection: "column",
              padding: 2,
              position: "relative",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
            key={item.title}
          >
            <IoMdClose
              fontSize={30}
              onClick={(e) => {
                e.stopPropagation();
                deleteResume(item._id);
                refetch();
              }}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                borderRadius: "100%",
                backgroundColor: "white",
                border: "1px solid",
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              noWrap
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="gray" textAlign="center" noWrap>
              {item.personalInfo?.fullName}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              gap={0.5}
              mt={1}
            >
              {item.skills?.slice(0, 3).map((skill: string, index: number) => (
                <Box
                  key={index}
                  sx={{
                    padding: "2px 6px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
            <Typography variant="body2" color="gray" textAlign="center" mt={1}>
              {item.education?.[0]?.degree} at {item.education?.[0]?.school}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminHomepage;
