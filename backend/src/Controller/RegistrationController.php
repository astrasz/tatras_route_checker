<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends ApiController
{
    #[Route('/api/register', name: 'register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        $form->submit($request->toArray());

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setEmail($form->get('email')->getData());
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email

            return $this->returnSuccessResponse(sprintf('User %s has been created succesfully', $user->getEmail()), JsonResponse::HTTP_CREATED);
        }

        $errorsArray = [];
        $errors = $form->getErrors(true, true);
        foreach ($errors as $error) {
            $errorsArray[$error->getOrigin()->getName()][] = $error->getMessage();
        }

        // dd(['errors' => $errorsArray]);
        return $this->returnFailureResponse($errors, JsonResponse::HTTP_BAD_REQUEST);
    }
}
