import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const BannerHome = () => {
	const bannerData = useSelector((state) => state.movieoData.bannerData);
	const imageURL = useSelector((state) => state.movieoData.imageURL);
	const [currentImage, setCurrentImage] = useState(0);

	const handleNext = () => {
		if (currentImage < bannerData.length - 1) {
			setCurrentImage((prev) => prev + 1);
		} else {
			setCurrentImage(0); // Loop back to the first image
		}
	};

	const handlePrevious = () => {
		if (currentImage > 0) {
			setCurrentImage((prev) => prev - 1);
		} else {
			setCurrentImage(bannerData.length - 1); // Loop back to the last image
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			handleNext();
		}, 5000);

		return () => clearInterval(interval);
	}, [currentImage, bannerData]);

	return (
		<section className="w-full h-full">
			<div className="relative flex overflow-hidden min-h-[450px] max-h-[95vh]">
				<div
					className="flex transition-transform duration-500"
					style={{ transform: `translateX(-${currentImage * 100}%)` }}>
					{bannerData.map((data, index) => (
						<div
							key={data.id + 'bannerHome' + index}
							className="min-w-full h-full relative group">
							<img
								src={imageURL + data.backdrop_path}
								className="h-full w-full object-cover"
							/>

							{/* Buttons for next and previous */}
							<div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex">
								<button
									onClick={handlePrevious}
									className="bg-white p-1 rounded-full text-xl z-10 text-black">
									<FaAngleLeft />
								</button>
								<button
									onClick={handleNext}
									className="bg-white p-1 rounded-full text-xl z-10 text-black">
									<FaAngleRight />
								</button>
							</div>

							{/* Gradient overlay */}
							<div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent" />

							{/* Content */}
							<div className="container mx-auto">
								<div className="w-full absolute bottom-0 max-w-md px-3">
									<h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
										{data?.title || data?.name}
									</h2>
									<p className="text-ellipsis line-clamp-3 my-2">
										{data.overview}
									</p>
									<div className="flex items-center gap-4">
										<p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
										<span>|</span>
										<p>View: {Number(data.popularity).toFixed(0)}</p>
									</div>
									<Link to={`/${data?.media_type}/${data.id}`}>
										<button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
											Play Now
										</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BannerHome;
