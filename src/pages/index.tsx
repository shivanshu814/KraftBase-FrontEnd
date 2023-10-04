/** @format */

import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import Map from '@/components/Map';
import { Listings, Listing } from '@/components/Listings';
import SearchBar from '@/components/SearchBar';

const HomePage = () => {
	const [center, setCenter] = useState([-74.5, 40] as [number, number]); // Default location
	const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

	const onSelectListingHandler = (listing: Listing) => {
		setSelectedListing(listing);
		setCenter([listing.lng, listing.lat]);
	};

	return (
		<Box p={4} bg='gray.50' minHeight='100vh'>
			<Box maxW='1200px' mx='auto' bg='white' boxShadow='sm' borderRadius='md'>
				<SearchBar />
				<HStack spacing={4} mt={4} p={4}>
					<Box flex='1' boxShadow='inner' borderRadius='md' overflow='hidden'>
						<Map center={center} selectedListing={selectedListing} />
					</Box>
					<Box
						flex='1'
						boxShadow='inner'
						borderRadius='md'
						overflow='hidden'
						bg='gray.100'>
						<Listings onSelectListing={onSelectListingHandler} />
					</Box>
				</HStack>
			</Box>
		</Box>
	);
};

export default HomePage;
