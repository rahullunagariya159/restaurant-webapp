import ResponsiveNavBar from "../Components/Navbar";
export default function DefaultLayout({ children }) {
	return(
		<>
			<ResponsiveNavBar />
			{children}
		</>
	);
}
