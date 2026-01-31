export default function QuoteTemplate({
	quote,
	context,
	target,
	year,
	background,
}: {
	quote: string;
	context: string | null;
	target: string;
	year: number;
	background: string;
}) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				backgroundImage: `url("data:image/png;base64,${background}")`,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Main Content */}
			<div
				style={{
					padding: 100,
					height: "95%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{context && (
					<p
						style={{
							fontFamily: "Rubik",
							fontSize: 36,
							fontWeight: 400,
							color: "white",
							textShadow: "2px 2px 10px rgba(0, 0, 0, 1)",
							textAlign: "center",
							marginBottom: 50,
						}}
					>
						*<i>{context}</i>*
					</p>
				)}
				<p
					style={{
						fontFamily: "Rubik",
						fontSize: 64,
						fontWeight: 900,
						color: "white",
						textShadow: "2px 2px 30px rgba(0, 0, 0, 1)",
						textAlign: "center",
					}}
				>
					"{quote}"
				</p>

				<p
					style={{
						fontFamily: "Rubik",
						fontSize: 45,
						fontWeight: 500,
						color: "white",
						textShadow: "2px 2px 10px rgba(0, 0, 0, 1)",
						textAlign: "center",
					}}
				>
					{target} {year}
				</p>
			</div>
			{/* Credit Footer */}
			<div
				style={{
					display: "flex",
					height: "5%",
					padding: 5,
				}}
			>
				<p
					style={{
						fontFamily: "Rubik",
						color: "white",
						fontSize: 24,
						fontWeight: 500,
						textShadow: "2px 2px 5px rgba(0, 0, 0, 1)",
					}}
				>
					Quote saved using QuotoMoto Discord Bot
				</p>
			</div>
		</div>
	);
}
