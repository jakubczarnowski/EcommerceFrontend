import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AdminProductList from "./ProductList";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddCard, Inventory } from "@mui/icons-material";
import AddProduct from "./AddProduct";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import IncomeView from "./IncomeView";
import ProductList from "./ProductList";
type Props = {
	pageChangeCallback: (page: JSX.Element) => void;
};

const AdminList = ({ pageChangeCallback }: Props) => {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: "20vw",
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: "20vw", boxSizing: "border-box" },
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => pageChangeCallback(<IncomeView />)}>
							<ListItemIcon>
								<Inventory />
							</ListItemIcon>
							<ListItemText primary={"Income View"} />
						</ListItemButton>
					</ListItem>
					<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
							<Typography sx={{ flexShrink: 0 }}>Products</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<ListItem disablePadding>
								<ListItemButton onClick={() => pageChangeCallback(<ProductList />)}>
									<ListItemIcon>
										<Inventory />
									</ListItemIcon>
									<ListItemText primary={"Product List"} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton onClick={() => pageChangeCallback(<AddProduct />)}>
									<ListItemIcon>
										<Inventory />
									</ListItemIcon>
									<ListItemText primary={"Create Product"} />
								</ListItemButton>
							</ListItem>
						</AccordionDetails>
					</Accordion>
					<Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
							<Typography sx={{ flexShrink: 0 }}>Categories</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<ListItem disablePadding>
								<ListItemButton onClick={() => pageChangeCallback(<CategoryList />)}>
									<ListItemIcon>
										<Inventory />
									</ListItemIcon>
									<ListItemText primary={"Category List"} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton onClick={() => pageChangeCallback(<AddCategory />)}>
									<ListItemIcon>
										<Inventory />
									</ListItemIcon>
									<ListItemText primary={"Create Category"} />
								</ListItemButton>
							</ListItem>
						</AccordionDetails>
					</Accordion>
				</List>
			</Box>
		</Drawer>
	);
};

export default AdminList;
