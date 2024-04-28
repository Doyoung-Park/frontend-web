// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BackgroundCard1 from "assets/img/BackgroundCard1.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { MastercardIcon, VisaIcon, DashboardLogo } from "components/Icons/Icons";
import { HSeparator } from "components/Separator/Separator";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import React, { useState } from "react";
import axios from "axios";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
  FaPaypal,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaWallet,
} from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";

function Writing() {
  // Chakra color mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "transparent");
  const { colorMode } = useColorMode();

  const [myTitle, setMyTitle] = useState('');
  const [myText, setMyText] = useState('');
  const [file, setMyFile] = useState(null);

  const handleFormSubmit = async () => {
    try {

      const title = myTitle;
      const content = myText.getInstance().getMarkdown();
      
      console.log("제목: ",title);
      console.log("입력한 텍스트: ", content);
      console.log("입력한 이미지: ", file);

      const request = new FormData()
      
      const text = JSON.stringify({title: title, content: content});
      const jsonData = new Blob([text], {type: "application/json"});

      request.append('text', jsonData);
      request.append('image', file);

      await axios.post("http://localhost:8080/writing/new",
       request, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });

      // 요청이 성공하면 사용자에게 성공 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
      alert('등록되었습니다.');
    } catch (error) {
      // 요청이 실패한 경우 에러를 처리합니다.
      console.error('등록 실패:', error);
    }
  }

  const fetchUploadImage = async (blob) => {
    console.log("Blob: ", blob);

    // 이미지를 axios.post를 이용해 서버로 전달 후 파일에 저장. 그리고 리턴된 주소를 path 에 저장

    // return path
    
  }

  const onUploadImage = async (blob, callback) => {
    console.log("@@: ", blob);
    setMyFile(blob);
    console.log("Test", blob); 
    callback(blob, blob.name);

  };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          xl: "1fr 1fr 1fr 1fr",
        }}
        templateRows={{ sm: "auto auto auto", md: "1fr auto", xl: "1fr" }}
        gap='26px'>

        <Card p='16px' display='flex' align='center' justify='center'>
          <CardBody>
            <Flex direction='column' align='center' w='100%' py='14px'>
              <IconBox as='box' h={"60px"} w={"60px"} bg={iconBlue}>
                <Icon h={"24px"} w={"24px"} color='white' as={FaWallet} />
              </IconBox>
              <Flex
                direction='column'
                m='14px'
                justify='center'
                textAlign='center'
                align='center'
                w='100%'>
                <Text fontSize='md' color={textColor} fontWeight='bold'>
                  책 제목
                </Text>
                <Text
                  mb='24px'
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='semibold'>
                  책 소개
                </Text>
                <HSeparator />
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                +$2000
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1.2fr" }} templateRows='1fr'>
        <Box>
          {/* 글 쓰기 텍스트창 시작 */}
          <Card p='16px' mt='24px'>
            <CardHeader>
              <Flex
                justify='space-between'
                align='center'
                minHeight='60px'
                w='100%'>
              
            <FormControl>
              <FormLabel fontSize='lg' color={textColor} fontWeight='bold'>
                글쓰기
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='제목을 입력해주세요'
                mb='24px'
                size='lg'
                onChange={(event) => {
                  setMyTitle(event.target.value)
                }}
              />
          </FormControl>
              </Flex>
            </CardHeader>
            
            <CardBody>
            <Editor
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical"
                    height="600px"
                    width='100%'
                    initialEditType="markdown"
                    // initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    ref={(editor) => {
                      // Editor 컴포넌트의 인스턴스를 참조합니다.
                      setMyText(editor);
                      // onUploadImage
                    }}
                    hooks={{
                      addImageBlobHook: onUploadImage,
                    }}
                  />
              <Button variant={colorMode === "dark" ? "primary" : "dark"}
                onClick={handleFormSubmit}>
                등록
              </Button>
            </CardBody>
          </Card>
          {/* 글 쓰기 텍스트창 끝 */}

        </Box>
        <Card
          p='22px'
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}>
          <CardHeader>
            <Flex justify='space-between' align='center' mb='1rem' w='100%'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Invoices
              </Text>
              <Button
                variant='outlined'
                color={colorMode === "dark" && "white"}
                borderColor={colorMode === "dark" && "white"}
                _hover={colorMode === "dark" && "none"}
                minW='110px'
                maxH='35px'>
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              {invoicesData.map((row, idx) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    price={row.price}
                    logo={row.logo}
                    format={row.format}
                    key={idx}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction='column'>
            <CardHeader py='12px'>
              <Text color={textColor} fontSize='lg' fontWeight='bold'>
                글 목록
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction='column' w='100%'>
                {billingData.map((row, key) => {
                  return (
                    <BillingRow
                      name={row.name}
                      company={row.company}
                      email={row.email}
                      number={row.number}
                      key={key}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        <Card my='24px' ms={{ lg: "24px" }}>
          <CardHeader mb='12px'>
            <Flex direction='column' w='100%'>
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w='100%'
                my={{ md: "12px" }}>
                <Text
                  color={textColor}
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight='bold'>
                  Your Transactions
                </Text>
                <Flex align='center'>
                  <Icon
                    as={FaRegCalendarAlt}
                    color='gray.400'
                    fontSize='md'
                    me='6px'></Icon>
                  <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                    23 - 30 March 2022
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction='column' w='100%'>
              <Text
                color='gray.400'
                fontSize={{ sm: "sm", md: "md" }}
                fontWeight='semibold'
                my='12px'>
                NEWEST
              </Text>
              {newestTransactions.map((row, idx) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={idx}
                  />
                );
              })}
              <Text
                color='gray.400'
                fontSize={{ sm: "sm", md: "md" }}
                fontWeight='semibold'
                my='12px'>
                OLDER
              </Text>
              {olderTransactions.map((row, idx) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                    key={idx}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Writing;
