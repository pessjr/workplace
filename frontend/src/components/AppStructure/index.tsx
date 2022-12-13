import React, { ReactElement } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { theme } from "../../utils/theme";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export interface PageNavigation {
  route: string;
  permission: string;
  displayName: string;
}

export interface AppStructure {
  children: ReactElement | ReactElement[];
  full?: boolean;
  pages?: PageNavigation[];
  settings?: PageNavigation[];
}

export const AppStructure: React.FC<AppStructure> = ({
  children,
  full = false,
  pages = [
    {
      displayName: "Início",
      route: "/app/",
      permission: "",
    },
    {
      displayName: "Usuários",
      route: "/app/users",
      permission: "",
    },
    {
      displayName: "Agendamentos",
      route: "/app/schedules",
      permission: "",
    },
  ],
  settings = [
    {
      displayName: "Início",
      route: "/app/",
      permission: "",
    },
    {
      displayName: "Usuários",
      route: "/app/users",
      permission: "",
    },
    {
      displayName: "Agendamentos",
      route: "/app/schedules",
      permission: "",
    },
  ],
}) => {
  const { spacing } = theme;
  const { push } = useRouter();
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("session");
    push("/");
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (full)
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    );
  return (
    <div>
      <AppBar color="primary" variant="elevation" position="relative">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map(({ displayName, route }) => (
                  <MenuItem key={route}>
                    <Typography textAlign="center">{displayName}</Typography>
                  </MenuItem>
                ))}
              </Drawer>
            </Box>
            <Link href="/app">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/assets/images/1653325381451.png"
                  style={{
                    maxWidth: 70,
                    background: "white",
                  }}
                />
                <Typography sx={{ ml: spacing(2) }}>Workplace</Typography>
              </Box>
            </Link>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map(({ route, displayName }) => (
                  <Link key={route} href={route}>
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      {displayName}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({ displayName, route }) => (
                    <MenuItem key={route} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{displayName}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={logout}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography textAlign="center">Sair</Typography>
                    <ExitIcon color="error" />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          width: "100vw",
          height: {
            xs: "calc(100vh - 56px)",
            sm: "calc(100vh - 64px)",
            md: "calc(100vh - 68.5px)",
          },
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </div>
  );
};
