import { useEffect, useState } from 'react'
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from 'axios'
import './style.scss'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxHeight: 200,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0"
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));

function DropdownMenu({ setDepartmentChoice, data }) {
  const [departmentNames, setDepartmentNames] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setDepartmentChoice(null)
  };

  const handleClickDropMenu = (event) => {
    setDepartmentChoice(event.target.value)
    getDepartment(event.target.value)
  }
  // creates a new array with all the elements of the subarrays concatenated 
  const allDepartments = data.map((user) => user.departments).flat();
  // remove all duplicate values from allDepartments array
  const filteredDepartments = [...new Set(allDepartments)]

  const getDepartment = async (departmentCode) => {
    try {
      const response = await axios.get(`https://geo.api.gouv.fr/departements/${departmentCode}`)
      return response
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getDepartmentData = async () => {
      const names = await Promise.all(filteredDepartments.map(code => getDepartment(code)))
      // management of department 20 which is in the json file but does not exist
      const namesFiltered = names.filter(element => { return element !== undefined })
      setDepartmentNames(namesFiltered)
    }
    getDepartmentData()
      .catch(console.error);
  }, [])

  return (
    <div className='select-btn'>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Département
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {departmentNames.map(department =>
          <MenuItem key={`${department?.data?.code}`} onClick={handleClickDropMenu} disableRipple value={department?.data?.code}>
            {department?.data?.nom}
          </MenuItem>
        )}
      </StyledMenu>
    </div >
  )
}

export default DropdownMenu
