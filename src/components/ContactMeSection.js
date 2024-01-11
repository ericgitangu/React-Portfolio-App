import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  Heading,
  Select,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
import FullScreenSection from "./FullScreenSection";

const ContactMeSection = () => {
  const initialValues = {
    firstName: "",
    email: "",
    type: "",
    comment: "",
  };

  // @ts-ignore
  const { onOpen } = useAlertContext();
  const { isLoading, response, submit } = useSubmit();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      comment: Yup.string().required("Comment is required").max(25),
    }),
    onSubmit: (values) => {
      submit("", values);
    },
  });

  useEffect(() => {
    //   console.log('useEffect: ' + JSON.stringify(response));
    if (response && response["type"] === "success") {
      onOpen(
        "success",
        `Thank you, ${
          formik.getFieldMeta("firstName").value
        }! Your form has been submitted successfully.`,
      );
      formik.resetForm();
    } else if (response && response["type"] === "error") {
      if (response && response["type"] === "error") {
        onOpen("error", `Oops! An error occurred: ${response["message"]}`);
      }
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={4}
      spacing={8}
    >
      <VStack w="1024px" p={24} alignItems="flex-start">
        <Heading as="h1" id="contact-me-section">
          Contact me
        </Heading>
        <Box p={2} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={
                  (formik.errors.firstName ?? "").toString().length > 0
                }
              >
                <Input
                  {...formik.getFieldProps("firstName")}
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={(formik.errors.email ?? "").toString().length > 0}
              >
                <Input
                  {...formik.getFieldProps("email")}
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl
                isInvalid={(formik.errors.comment ?? "").toString().length > 0}
              >
                <Textarea
                  {...formik.getFieldProps("comment")}
                  placeholder="Comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Submitting"
                colorScheme="teal"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
