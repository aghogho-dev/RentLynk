import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	images: {
		remotePatterns: [
			{
				hostname: "picsum.photos",
				port: "",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
