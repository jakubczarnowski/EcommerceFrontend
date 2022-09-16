import { Avatar, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { NumberLiteralType } from "typescript";

type Props = {
	name: string;
	rating: number;
	timePosted: Date;
	message: string;
};

const Review = ({ name, rating, timePosted, message }: Props) => {
	return (
		<Box sx={{ width: "100%", marginTop: "30px" }}>
			<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Avatar sx={{ marginX: "5px" }} />
					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
						<Typography variant="h5" sx={{ textTransform: "capitalize", marginX: "5px", fontSize: "16px", fontWeight: "500" }}>
							{name}
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
							<Rating value={rating} readOnly></Rating>
							<Typography sx={{ marginX: "5px", fontSize: "16px", fontWeight: "500" }}>{rating.toFixed(1)}</Typography>
							<Typography sx={{ MarginX: "5px", fontSize: "16px", fontWeight: "400" }}>{moment(timePosted).fromNow()}</Typography>
						</Box>
					</Box>
				</Box>
				<Box>
					<Typography variant="body2" sx={{ marginTop: "15px", fontSize: "15px", fontWeight: "400" }}>
						{message}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Review;
