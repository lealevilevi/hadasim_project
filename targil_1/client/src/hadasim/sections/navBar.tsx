
import { NavLink } from "react-router-dom";
import { PATHS } from "../api/path";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'red' }}>
            <Toolbar >
                <Typography variant="h6" component={NavLink} to={PATHS.signInUser} style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                signInUser
                </Typography>
                <Typography variant="h6" component={NavLink} to={PATHS.login} style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
                    login
                </Typography>
                <Typography variant="h6" component={NavLink} to={PATHS.patient} style={{ textDecoration: 'none', color: 'inherit',marginRight: '20px'  }}>
                    Patients
                </Typography>
                <Typography variant="h6" component={NavLink} to={PATHS.graph} style={{ textDecoration: 'none', color: 'inherit' ,marginRight: '20px' }}>
                    Graph
                </Typography>
                <Typography variant="h6" component={NavLink} to={PATHS.signIn} style={{ textDecoration: 'none', color: 'inherit' ,marginRight: '20px' }}>
                    SignIn
                </Typography>
                <Typography variant="h6" component={NavLink} to={PATHS.addCoronaDetails} style={{ textDecoration: 'none', color: 'inherit' ,marginRight: '20px' }}>
                    Add Corona Details
                </Typography>
              
            </Toolbar>
        </AppBar>
    );
}
