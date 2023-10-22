import { FC, ReactNode } from 'react';
import { Grid, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../Navbar';
import FloatingMessage from '../FloatingMessage';

type LayoutProps = {
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Grid
            minH={'100vh'}
            bg={useColorModeValue('mainGray.100', 'transparent')}
            templateColumns={'1fr'}
            templateRows={'auto 1fr'}
        >
            <header>
                <Navbar />
                {/* <FloatingMessage /> Add the FloatingMessage component here */}
            </header>

            <main>
            {/* <FloatingMessage /> */}
                {children}
            </main>
        </Grid>
    )
}

export default Layout;
