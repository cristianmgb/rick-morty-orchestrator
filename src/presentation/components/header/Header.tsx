import { Box } from '@mui/material';
import logo from '@/assets/brand-logo.svg';
import background from '@/assets/backgound.png';
import { InputSearch } from 'rick-morty-components-lib';
import { useGlobalStore } from '@/presentation/store/useGlogalStore';

export const Header = () => {
  const setQuery = useGlobalStore((state) => state.setQuery);
  return (
    <Box
      position="relative"
      sx={{
        width: '100%',
        height: '328px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'indigo',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          position: 'absolute',
          zIndex: 0,
          width: '100%',
          height: '328px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          top: 0,
          left: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0) 15%, rgba(0,0,0,0.65) 60%)',
            pointerEvents: 'none',
          },
        }}
      ></Box>
      <img
        src={logo}
        alt="brand-logo"
        className="brand-logo"
        width={274}
        height={96}
        style={{ marginTop: '64px' }}
      />
      <Box
        sx={{
          mt: '48px',
          width: '96%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <InputSearch onChange={setQuery} />
      </Box>
    </Box>
  );
};
