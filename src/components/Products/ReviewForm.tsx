import { Box, Button, Input, OutlinedInput, Rating, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const ReviewForm = (props: Props) => {
	const [message, setMessage] = useState("");
	const [rating, setRating] = useState(0);
	return (
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "30px", gap: "15px" }}>
			<Typography sx={{ fontSize: "28px", fontWeight: "400" }}>Write a review</Typography>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Typography sx={{ fontSize: "16px", color: "primary.blue" }}>Your Rating:</Typography>
				<Rating onChange={(e, val) => setRating(val || 0)} value={rating} />
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Typography sx={{ fontSize: "16px", color: "primary.blue" }}>Your Review:</Typography>
				<OutlinedInput color="secondary" multiline placeholder="Write a review here..." rows={4} />
			</Box>
			<Button sx={{ width: "80px", marginY: "10px " }} color="secondary" variant="contained">
				Submit
			</Button>
		</Box>
	);
};

export default ReviewForm;
