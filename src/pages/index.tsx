import React, { FormEvent, useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import CreatePostDrawer from '../components/CreatePostDrawer';
import Posts from '../components/Posts';
import Layout from '../components/Layout';
import CustomTable from '../components/CustomTable';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useColorModeValue,
  VStack,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { usePosts } from '../services/realtimeDatabase';
import { TPost } from '../types/TPost';
import { categories } from '../data/categories';

const Home: NextPage = () => {
  const { posts } = usePosts();
  const allPosts = [...posts];

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  function getSelectedCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);
  }

  function filterPostsBySelectedCategory(post: TPost) {
    return post.category === selectedCategory || selectedCategory === 'ALL';
  }

  const [isSearching, setIsSearching] = useState(false);
  const [postsSearchResult, setPostsSearchResult] = useState([] as TPost[]);

  function searchPostsByTitle(event: FormEvent) {
    const searchContent = (event.target as HTMLInputElement).value;

    if (searchContent.length > 0) {
      setIsSearching(true);

      const searchResult = allPosts.filter((post) => {
        const rule = new RegExp(searchContent, 'gi');
        return rule.test(post.title);
      });

      setPostsSearchResult(searchResult);
    } else {
      setIsSearching(false);
    }
  }

  // Add this useEffect hook to inject the AdSense script into the document's head
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7394411430817166';
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup function to remove the script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>VUNA Updates | Home</title>
        <meta
          name="description"
          content="Ask your questions, be anonymous or not, and contribute to the VUNA Updates Community"
        />
      </Head>
      <Helmet>
        <meta property="og:title" content="VUNA Updates | Home" />
        <meta
          property="og:description"
          content="Welcome to VUNA Updates, a vibrant online community where you can ask questions, share insights, and engage in meaningful discussions. Whether you prefer to remain anonymous or showcase your identity, we invite you to contribute your thoughts, experiences, and expertise to the enriching VUNA Updates Community. Explore a diverse range of topics, from technology and lifestyle to culture and more. Join us in fostering a supportive environment where knowledge and ideas thrive."
        />
        <meta
          property="og:image"
          content=""
        /> {/* Replace with your image URL */}
        {/* Add other Open Graph meta tags here */}
      </Helmet>


      <main>
        <Container maxW="container.lg" my={8}>
          <Flex as="section" w="full" mt={8} alignItems="center" gap={{ base: 4, sm: 6, lg: 8 }}>
            <CreatePostDrawer />
            <InputGroup flex={1}>
              <InputLeftElement mt={1}>
                <SearchIcon />
              </InputLeftElement>
              <Input
                id="search"
                name="search"
                placeholder="Search Post"
                size="lg"
                onChange={searchPostsByTitle}
              />
            </InputGroup>
          </Flex>

          <Flex as="section" mt={8} w="full" alignItems="flex-start" gap={{ base: 4, sm: 6, lg: 8 }}>
            <Box display={{ base: 'none', md: 'flex' }}>
              <CustomTable selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </Box>
            <Box flex={1} minW={0}>
              {isSearching ? (
                <Posts posts={postsSearchResult.filter(filterPostsBySelectedCategory)} />
              ) : (
                <Posts posts={allPosts.filter(filterPostsBySelectedCategory)} />
              )}
            </Box>
          </Flex>

          {/* Add Button with Links
          <Box
            position="fixed" // Position the button at the bottom of the container
            bottom="100px" // Set the distance from the bottom
            left="50%" // Center the button horizontally
            transform="translateX(-50%)" // Center the button horizontally
          >
            <Button
              as="a"
              href="https://www.highcpmrevenuegate.com/yadniuwkh?key=2afbd09ba20bdb36306c37c52f5a3244"
              target="_blank"
              colorScheme="red"
              fontSize="xl"
              width="200px" // Set your desired width
              bg="red" // Set the background color to transparent
              color="red" // Set the text color to red
            >
              <Text color="black">Vuna Leak tapes</Text>
            </Button>
          </Box> */}
        </Container>
      </main>
    </Layout>
  );
};

export default Home;