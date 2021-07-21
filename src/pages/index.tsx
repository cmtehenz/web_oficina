import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import { signIn as signInGit, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const [session] = useSession();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (value) => {
    event.preventDefault()
    const { email, password } = value;
    await signIn({ email, password});
  };

  if(session){
    router.push('/dashboard')
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            error={errors.email}
            type="email"
            {...register("email")}
          />
          <Input
            name="senha"
            label="Senha"
            error={errors.password}
            type="password"
            {...register("password")}
          />

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
          <Button
            mt="6"
            colorScheme="cyan"
            size="lg"
            onClick={() => signInGit("github")}
          >
            Entrar com GitHub
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if(cookies['flygo.token']){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
