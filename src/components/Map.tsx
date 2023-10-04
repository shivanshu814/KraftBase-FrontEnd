/** @format */

import { Box, Icon } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
// npm install react-icons
import { MdLocationOn } from 'react-icons/md';

// import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
type Listing = {
	id: string | number;
	lat: number;
	lng: number;
	name: string;
	description?: string;
};

interface MapProps {
	center: [number, number];
	selectedListing: Listing | null;
}

const Map: React.FC<MapProps> = ({ center, selectedListing }) => {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
			console.error('Mapbox access token is missing!');
			return;
		}

		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

		const map = new mapboxgl.Map({
			container: mapContainerRef.current as HTMLDivElement,
			style: 'mapbox://styles/mapbox/streets-v11',
			center,
			zoom: 12,
		});

		map.addControl(new mapboxgl.NavigationControl());

		mapRef.current = map;

		const addedMarkers: mapboxgl.Marker[] = [];

		// If a listing is selected, show its marker and pan to its location
		if (selectedListing) {
			const el = document.createElement('div');

			ReactDOM.render(
				<Icon as={MdLocationOn} boxSize='24px' color='red' />,
				el
			);
			el.style.width = '24px';
			el.style.height = '1000px'; // Corrected height
			el.style.cursor = 'pointer';

			const marker = new mapboxgl.Marker(el)
				.setLngLat([selectedListing.lng, selectedListing.lat])
				.setPopup(new mapboxgl.Popup().setText(selectedListing.name))
				.addTo(map);

			addedMarkers.push(marker);
		}

		return () => {
			// Remove added markers
			addedMarkers.forEach((marker) => marker.remove());

			// Remove map
			map.remove();
		};
	}, [center, selectedListing]);

	return (
		<Box
			ref={mapContainerRef}
			width='full'
			height='500px'
			borderRadius='md'
			overflow='hidden'
		/>
	);
};

export default Map;
