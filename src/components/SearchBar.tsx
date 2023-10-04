/** @format */

// components/SearchBar.tsx
import { Input, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

const SearchBar: React.FC = () => {
	const [location, setLocation] = useState('');
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');

	return (
		<Stack
			direction={{ base: 'column', md: 'row' }}
			spacing={4}
			p={4}
			boxShadow='md'
			borderRadius='md'
			bg='blackAlpha.900'>
			<FormControl>
				<FormLabel color='white'>Location</FormLabel>
				<Input
					variant='outline'
					placeholder='Enter location'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					borderColor='white'
					color='white'
				/>
			</FormControl>

			<FormControl>
				<FormLabel color='white'>Check-in</FormLabel>
				<Input
					type='date'
					value={checkIn}
					onChange={(e) => setCheckIn(e.target.value)}
					borderColor='white'
					color='white'
				/>
			</FormControl>

			<FormControl>
				<FormLabel color='white'>Check-out</FormLabel>
				<Input
					type='date'
					value={checkOut}
					onChange={(e) => setCheckOut(e.target.value)}
					min={checkIn} // Ensure check-out date is after check-in date
					borderColor='white'
					color='white'
				/>
			</FormControl>

			<Button
				color='black'
				mt='18px' // Move the button down by 3px
				width='calc(100% + 2px)'
				bg='green'
				_hover={{ bg: 'red' }}
				_active={{ bg: 'green.500', transform: 'scale(0.95)' }}>
				Search
			</Button>
		</Stack>
	);
};

export default SearchBar;
