import { Heading, VStack, Text } from 'native-base';

import Logo from '../assets/Logo.svg';

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Find() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mt={8} textAlign="center">
          Encontre um bolão através de {'\n'} um código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button
          title="BUSCAR BOLÃO"
        />

      </VStack>
    </VStack>
  );
}