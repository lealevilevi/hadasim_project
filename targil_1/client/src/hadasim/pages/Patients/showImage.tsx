import { useEffect, useState } from "react";
import { getPatientById } from "../../service/patientService";
import { Avatar } from "@mui/material";

interface PictureProps {
  id: string;
}

const Picture: React.FC<PictureProps> = (props:{ id:string }) => {
  const [picture, setPicture] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchPicture = async () => {
      console.log(props.id)
        if(props.id!=''){
      try {
        
          const imageBlob = await getPatientById(props.id);// קריאה לשרת לקבלת התמונה המתאימה למשתמש
          const imageUrl = URL.createObjectURL(imageBlob); // יצירת URL לתמונה
          setPicture(imageUrl); // עדכון המשתנה המקומי של התמונה
      } catch (error:any) {
        console.error('Error fetching picture:', error.response.data);
      }
    }
    };

    fetchPicture();

    // Clean up URL object when component unmounts
    return () => {
      if (picture) {
        URL.revokeObjectURL(picture);
      }
    };
  },[props.id]);

  if (!picture) {
    return <div></div>;
  }

  return <>
  <Avatar alt="Remy Sharp" src={picture} >
    <img  src={picture}/>
    </Avatar></>;
};

export default Picture;
