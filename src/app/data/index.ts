// Your existing 15 images
const allImages = [
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/6792613a5d497ebec43738c6_RZ_Clou_Portfolio_LIV_Achte_auf_dich_Home_04_Tiny.jpg",
		alt: "Thumbnail 11",
		link: "/projekte/achte-auf-dich",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e882afc6a8848e76033_Clou_Canvas-Stans-Lacht.jpg",
		alt: "Thumbnail 01",
		link: "/projekte/stans-lacht",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_Clou_Canvas-Die-Goettliche-Ordnung.jpg",
		alt: "Thumbnail 06",
		link: "/projekte/die-goettliche-ordnung",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e52ade312753d5f2878_Clou_Canvas-Vitality-Cards.jpg",
		alt: "Thumbnail 08",
		link: "/projekte/vitality-cards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e82c8259eeb5be828b6_Clou_Canvas-Spinnerei.jpg",
		alt: "Thumbnail 02",
		link: "/projekte/spinnerei",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e0a059ea93d0fb2bc73_Clou_Canvas-Arcon.jpg",
		alt: "Thumbnail 15",
		link: "/projekte/arcon",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e40966b042051b90fb8_Clou_Canvas-Charles-Nguela.jpg",
		alt: "Thumbnail 10",
		link: "/projekte/charles-nguela",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_Clou_Canvas-Beialge-Magazin.jpg",
		alt: "Thumbnail 07",
		link: "/projekte/tavolago",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_Clou_Portfolio_TFL_Tiny.jpg",
		alt: "Thumbnail 14",
		link: "/projekte/tourismus-awards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_Clou_Canvas-New-Hope.jpg",
		alt: "Thumbnail 13",
		link: "/projekte/new-hope-sa",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e4b966b042051b9156f_Clou_Canvas-Lostly.jpg",
		alt: "Thumbnail 09",
		link: "/projekte/lostly",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e733244c9eb3d3ffa63_Clou_Canvas-Loris-Mate.jpg",
		alt: "Thumbnail 04",
		link: "/projekte/loris-mate",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_Clou_Canvas-Sachaklemm.jpg",
		alt: "Thumbnail 03",
		link: "/projekte/atelier-sacha-klemm",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e27f634a4a4761eb4ad_Clou_Canvas-BelArosa-Chalet.jpg",
		alt: "Thumbnail 12",
		link: "/projekte/belarosa-chalet",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e6c5240bf0d97fdef51_Clou_Canvas-TCS-Iceteam.jpg",
		alt: "Thumbnail 05",
		link: "/projekte/tcs-camping-bio-tea",
	 },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder1.jpg",
	// 	alt: "Additional Image 16",
	// 	link: "/projekte/additional-1",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder2.jpg",
	// 	alt: "Additional Image 17",
	// 	link: "/projekte/additional-2",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder3.jpg",
	// 	alt: "Additional Image 18",
	// 	link: "/projekte/additional-3",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder4.jpg",
	// 	alt: "Additional Image 19",
	// 	link: "/projekte/additional-4",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder5.jpg",
	// 	alt: "Additional Image 20",
	// 	link: "/projekte/additional-5",
	// },
];

// Shuffle and export
function getRandomImages(count: number = 15) {
	const shuffled = [...allImages].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

export const heroImages = getRandomImages(15);
