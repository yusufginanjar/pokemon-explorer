import * as React from "react";
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div
			style={{
				background:
					"linear-gradient(-20deg, rgba(59,76,202,1) 0%, rgba(255,0,0,1) 100%)",
				minHeight: "100vh",
			}}>
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
