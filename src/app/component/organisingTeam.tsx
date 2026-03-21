"use client";
import { useState, useMemo } from "react";
import TiltedCard from "@/components/TiltedCard";
import InfiniteMenu from "@/components/InfiniteMenu";

type TeamMember = {
	slot: string;
	name: string;
	role: string;
	imageSrc: string;
	flipImageSrc?: string;
};

const organisingTeamMembers: TeamMember[] = [
	{
		slot: "Team_000",
		name: "Dr. K Sathish Kumar",
		role: "Head of Organising Team",
		imageSrc: "/assets/OG_S/Dr. K Sathish Kumar.png",
		flipImageSrc: "/assets/OG_S/Dr. K Sathish Kumar.png"
	},
	{
		slot: "Team_000A",
		name: "Dr. Marimuthu R",
		role: "Head of Organising Team",
		imageSrc: "/assets/OG_S/Dr. Marimuthu R.png",
		flipImageSrc: "/assets/OG_S/Dr. Marimuthu R.png"
	},
	{
		slot: "Team_016",
		name: "Shuktika",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/16_back.png",
		flipImageSrc: "/assets/OG_S/16_front.svg"
	},
	{
		slot: "Team_003",
		name: "Animeha",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/3_back.png",
		flipImageSrc: "/assets/OG_S/3_front.svg"
	},
	{
		slot: "Team_010",
		name: "Goral Gupta",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/10_back.png",
		flipImageSrc: "/assets/OG_S/10_front.svg"
	},
	{
		slot: "Team_004",
		name: "Arnav Shrivastava",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/4_back.png",
		flipImageSrc: "/assets/OG_S/4_front.svg"
	},
	{
		slot: "Team_012",
		name: "Naman Gupta",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/12_back.png",
		flipImageSrc: "/assets/OG_S/12_front.svg"
	},
	{
		slot: "Team_013",
		name: "Kaustubh Shandilya",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/13_back.png",
		flipImageSrc: "/assets/OG_S/13_front.svg"
	},
	{
		slot: "Team_001",
		name: "Aadhaar Verma",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/1_back.png",
		flipImageSrc: "/assets/OG_S/1_front.svg"
	},
	{
		slot: "Team_018",
		name: "Aayush",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/18_back.png",
		flipImageSrc: "/assets/OG_S/18_front.svg"
	},
	{
		slot: "Team_015",
		name: "Rahul Natesan",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/15_back.png",
		flipImageSrc: "/assets/OG_S/15_front.svg"
	},
	{
		slot: "Team_011",
		name: "Tejas M",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/11_back.png",
		flipImageSrc: "/assets/OG_S/11_front.svg"
	},
	{
		slot: "Team_002",
		name: "Aniket",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/2_back.png",
		flipImageSrc: "/assets/OG_S/2_front.svg"
	},
	{
		slot: "Team_009",
		name: "Chandni",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/9_back.png",
		flipImageSrc: "/assets/OG_S/9_front.svg"
	},


	{
		slot: "Team_006",
		name: "Rishab Paul",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/6_back.png",
		flipImageSrc: "/assets/OG_S/6_front.svg"
	},
	// {
	// 	slot: "Team_019",
	// 	name: "Lakshya Saini",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/19_back.png",
	// 	flipImageSrc: "/assets/OG_S/19_front.svg"
	// },
	{
		slot: "Team_007",
		name: "Bhavya Singla",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/7_back.png",
		flipImageSrc: "/assets/OG_S/7_front.svg"
	},
	{
		slot: "Team_008",
		name: "Byasdev",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/8_back.png",
		flipImageSrc: "/assets/OG_S/8_front.svg"
	},


	{
		slot: "Team_014",
		name: "Naman",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/14_back.png",
		flipImageSrc: "/assets/OG_S/14_front.svg"
	},


	{
		slot: "Team_017",
		name: "Tamanna",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/17_back.png",
		flipImageSrc: "/assets/OG_S/17_front.svg"
	},

	{
		slot: "Team_005",
		name: "Vinayak",
		role: "Organising Team",
		imageSrc: "/assets/OG_S/5_back.png",
		flipImageSrc: "/assets/OG_S/5_front.svg"
	},
	// {
	// 	slot: "Team_020",
	// 	name: "Amar Hamdan",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Amar hAMDAN.png"
	// },
	// {
	// 	slot: "Team_021",
	// 	name: "Arnav Gupta",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Arnav Gupta.png"
	// },
	// {
	// 	slot: "Team_022",
	// 	name: "aRYA mISHRA",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/aRYA mISHRA.png"
	// },

	// {
	// 	slot: "Team_025",
	// 	name: "Palak Kumawat",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Palak Kumawat.png"
	// },
	// {
	// 	slot: "Team_026",
	// 	name: "Prakhar Patel",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Prakhar Patel.png"
	// },
	// {
	// 	slot: "Team_027",
	// 	name: "Prakul k hebbur",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Prakul k hebbur.png"
	// },
	// {
	// 	slot: "Team_028",
	// 	name: "Pranav Sajeev",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Pranav Sajeev.png"
	// },
	// {
	// 	slot: "Team_029",
	// 	name: "Riddhi tambi",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Riddhi tambi.png"
	// },
	// {
	// 	slot: "Team_030",
	// 	name: "Rishi kinger",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Rishi kinger.png"
	// },
	// {
	// 	slot: "Team_031",
	// 	name: "Vasabdatwa Patra",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/Vasabdatwa Patra.png"
	// },
	// {
	// 	slot: "Team_032",
	// 	name: "YUG ARORA",
	// 	role: "Organising Team",
	// 	imageSrc: "/assets/OG_S/YUG ARORA.png"
	// },
];

export default function OrganisingTeam() {
	const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

	const toggleCard = (slot: string) => {
		setFlippedCards((prev) => ({
			...prev,
			[slot]: !prev[slot]
		}));
	};

	return (
		<section id="oc" className="w-full mt-0 sm:py-18 lg:py-20 border-t border-[#18B8DA]/10 relative overflow-hidden bg-transparent">
			<div className="mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
				<div className="flex flex-col sm:flex-row items-center mb-10 sm:mb-16 gap-4 sm:gap-0">
					<div className="hidden sm:block flex-1 h-0.75 bg-linear-to-r from-transparent via-[#18B8DA]/30 to-transparent" />
					<div className="px-4 sm:px-8">
						<div className="flex items-center justify-center gap-2 sm:gap-4">
							<div className="hidden sm:flex gap-1">
								<div className="w-1 h-1 bg-[#18B8DA]" />
								<div className="w-1 h-1 bg-[#18B8DA]/60" />
								<div className="w-1 h-1 bg-[#18B8DA]/30" />
							</div>
							<h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-ethnocentric text-white text-center">
								Organising <span className="text-[#18B8DA]">Team</span>
							</h2>
							<div className="hidden sm:flex gap-1">
								<div className="w-1 h-1 bg-[#18B8DA]/30" />
								<div className="w-1 h-1 bg-[#18B8DA]/60" />
								<div className="w-1 h-1 bg-[#18B8DA]" />
							</div>
						</div>
						<p className="text-center text-[#18B8DA]/60 text-sm sm:text-base md:text-xl font-mono mt-2 tracking-wider uppercase">
							Core Execution Unit
						</p>
					</div>
					<div className="hidden sm:block flex-1 h-0.75 bg-linear-to-r from-transparent via-[#18B8DA]/30 to-transparent" />
				</div>

				{/* Mobile: InfiniteMenu sphere */}
				<div className="sm:hidden w-full" style={{ height: "500px", position: "relative" }}>
					<InfiniteMenu
						items={organisingTeamMembers.map((member) => ({
							image: member.imageSrc,
							link: "#",
							title: "",
							description: "",
						}))}
						scale={1.5}
					/>
				</div>

				{/* Desktop/Tablet: TiltedCard grid */}
				<div className="hidden sm:flex flex-wrap justify-center gap-6 lg:gap-8 mx-auto">
					{organisingTeamMembers.map((member) => {
						const isFlippable = Boolean(member.flipImageSrc);
						const isFlipped = Boolean(flippedCards[member.slot]);

						return (
							<div key={member.slot} className="relative group">
								{isFlippable ? (
									<button
										type="button"
										onClick={() => toggleCard(member.slot)}
										aria-pressed={isFlipped}
										aria-label={`${member.name} card`}
										className="relative rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18B8DA]/60"
									>
										<div
											className="relative h-90 w-57.5 transition-transform duration-500 ease-out"
											style={{
												transformStyle: "preserve-3d",
												transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
											}}
										>
											<div
												className="absolute inset-0"
												style={{ backfaceVisibility: "hidden" }}
											>
												<TiltedCard
													imageSrc={member.imageSrc}
													altText={`${member.name} back`}
													captionText={member.name}
													containerHeight="360px"
													containerWidth="230px"
													imageHeight="360px"
													imageWidth="230px"
													rotateAmplitude={30}
													scaleOnHover={1.2}
													showMobileWarning={false}
												/>
											</div>

											<div
												className="absolute inset-0"
												style={{
													backfaceVisibility: "hidden",
													transform: "rotateY(180deg)"
												}}
											>
												<TiltedCard
													imageSrc={member.flipImageSrc!}
													altText={`${member.name} front`}
													captionText={member.name}
													containerHeight="360px"
													containerWidth="230px"
													imageHeight="360px"
													imageWidth="230px"
													rotateAmplitude={30}
													scaleOnHover={1.2}
													showMobileWarning={false}
												/>
											</div>
										</div>
									</button>
								) : (
									<div className="relative rounded-sm">
										<TiltedCard
											imageSrc={member.imageSrc}
											altText={member.name}
											captionText={member.name}
											containerHeight="360px"
											containerWidth="230px"
											imageHeight="360px"
											imageWidth="230px"
											rotateAmplitude={30}
											scaleOnHover={1.2}
											showMobileWarning={false}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
