import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <HStack spacing={4}>
      <Image src={imageSrc} alt={title} boxSize="100px" />
      <VStack align="start" spacing={2}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text>{description}</Text>
      </VStack>
      <FontAwesomeIcon icon={faArrowRight} />
    </HStack>
  );
};

export default Card;
