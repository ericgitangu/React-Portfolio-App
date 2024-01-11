import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, VStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: developer.ericgitangu@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/ericgitangu",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/ericgtangu",
  },
  {
    icon: faTwitter,
    url: "https://twitter.com",
  },
  {
    icon: faDiscord,
    url: "https://discordapp.com/users/637500198976880670",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // @ts-ignore
  const [scrollDirection, setScrollDirection] = useState("up");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);

  return (
    <Box
      position="fixed"
      hidden={scrollDirection === "down"}
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            {socials.map((social, index) => (
              <a key={index} href={social.url}>
                <FontAwesomeIcon icon={social.icon} style={{ padding: 8, height:'20px' }} />
              </a>
            ))}
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a href="#projects-section">Projects</a>
              <a href="#contact-me-section">Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
