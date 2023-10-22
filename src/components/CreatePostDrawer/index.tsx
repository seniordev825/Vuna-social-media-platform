import { FC } from "react";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAuth } from '../../hooks/useAuth';

import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import CustomTextarea from '../CustomTextarea';
import MyCustomTextarea from '../CustomTextarea/MyCustomTextarea'
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, FormControl, Text, DrawerFooter, Icon, VStack, FormLabel, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { TPost, TPostImageType } from '../../types/TPost';
import { createPostForm } from '../../types/CreatePostForm';

import { createPostValidationSchema } from '../../utils/validation/createPostValidationSchema';
import { capitalizeWord } from '../../utils/other/capitalizeWord';

import { addPost } from '../../services/realtimeDatabase';
import { categories } from '../../data/categories';

import { RiFileAddFill } from 'react-icons/ri';
import { upload } from "../../services/storage";

type dataType = {
  tag: string;
  title?: string;
  sources?: string[];
}
const CreatePostDrawer: FC = () => {

  const { currentUser } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<TPostImageType[]>([])

  async function handleSubmit({ title, content, category }: createPostForm) {
    let feedbackType: 'success' | 'error';
    let feedbackDescription: string;

    const newPost: TPost = {
      title,
      content,
      category,
      createdAt: new Date().getTime(),
      creatorId: currentUser!.uid,
      creatorEmail: currentUser!.email!,
      creatorPhotoURL: currentUser!.photoURL,
      images: data
    };

    try {
      await addPost(newPost);
      feedbackType = 'success';
      feedbackDescription = 'Your post has been successfully created!';
    }

    catch (error) {
      console.log(error);
      feedbackType = 'error';
      feedbackDescription = 'An error has ocurred. Please, try again.';
    }

    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackDescription,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
    onClose();
    setData([])
  }
  const [sources, setSources] = useState([''])
  /* Special styles from Chakra (for light/dark mode) */
  const contentBodyBg = useColorModeValue('mainGray.200', 'gray.900');
  const refImage = useRef<HTMLInputElement>(null);
  const refVideo = useRef<HTMLInputElement>(null);



  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>, type: "img" | "video") => {
    const files = event.target.files;
    for (let i = 0; i < (files ? files.length : 0) && files; i++) {
      const url = await upload(files?.[i])
      setData((prev) => [...prev, { url, type }])

    }
  }


  return (
    <>
      <Button
        variant='primary'
        rounded={{ base: 'full', sm: 'lg' }}
        h={'min-content'}
        w={'min-content'}
        py={{ base: 3, sm: 3 }}
        px={{ base: 3, md: 7 }}
        disabled={!currentUser}
        onClick={onOpen}
      >
        <Icon as={RiFileAddFill} h={6} w={6} mr={{ base: 0, sm: 1 }} />
        <Box display={{ base: 'none', sm: 'inline' }}>
          Create Post
        </Box>
      </Button>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='lg'
      >
        <Formik
          initialValues={{ title: '', category: '', content: '' }}
          validationSchema={createPostValidationSchema}
          onSubmit={handleSubmit}
        >
          {
            () => (
              <Form>
                <DrawerOverlay />

                <DrawerContent>

                  <DrawerCloseButton />

                  <DrawerHeader borderBottomWidth='1px'>
                    What do you have for us today?
                  </DrawerHeader>

                  <DrawerBody bg={contentBodyBg}>

                    <VStack spacing={3}>

                      <FormControl>
                        <FormLabel htmlFor='title'>
                          Title
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <CustomInput name='title' type='text' placeholder='Post Title' icon='info' />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='category'>
                          Category
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <CustomSelect name='category'>
                          <option value="">Select a category</option>
                          {
                            categories.map(category =>
                              <option key={category.title} value={category.title}>{category.title}</option>
                            )
                          }
                        </CustomSelect>
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='content'>
                          Content
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        {/* <CustomTextarea name='content' placeholder='Post Content' /> */}
                        <MyCustomTextarea name='content' placeholder='Post Content' />
                      </FormControl>
                      <input type="file" ref={refImage} hidden accept="image/*" multiple onChange={(e) => handleInput(e, 'img')} />
                      <input type="file" ref={refVideo} hidden accept="video/*" multiple onChange={(e) => handleInput(e, 'video')} />
                      <FormControl>
                        <FormLabel htmlFor='content'>
                          Images
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <Button onClick={() => { refImage.current?.click() }} mr={3} variant='primary'>
                          Add Image
                        </Button>
                        <Button onClick={() => { refVideo.current?.click() }} mr={3} variant='primary'>
                          Add Video
                        </Button>
                      </FormControl>
                      <div style={{ columnCount: "1", columnGap: "12px" }}>
                        {data.map((item, i) =>
                          (item.type === "video") ?
                            <video width={"100%"} key={i} muted loop controls>
                              <source src={item.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            :
                            <img key={i} width={"100%"} src={item.url} />
                        )}
                      </div>
                    </VStack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth='1px'>
                    <Button mr={3} variant='secondary' onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type='submit' variant='primary'>Post</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Form>
            )
          }
        </Formik>

      </Drawer >
    </>
  );
};

export default CreatePostDrawer;