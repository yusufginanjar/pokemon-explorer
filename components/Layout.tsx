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
        background: "linear-gradient(263deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.6) 50%, rgba(252,176,69,1) 100%)",
        minHeight: "100vh",
			}}>
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
