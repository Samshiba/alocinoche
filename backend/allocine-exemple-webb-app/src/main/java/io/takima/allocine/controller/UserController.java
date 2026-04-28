package io.takima.allocine.controller;

import io.takima.allocine.model.Review;
import io.takima.allocine.model.User;
import io.takima.allocine.service.ReviewService;
import io.takima.allocine.service.UserService;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
@Tag(name = "Users", description = "API pour gérer les utilisateurs")
public class UserController {

    private final UserService userService;
    private final ReviewService reviewService;

    public UserController(UserService userService, ReviewService reviewService) {
        this.userService = userService;
        this.reviewService = reviewService;
    }

    /**
     * Liste tous les utilisateurs
     *
     * @return
     */
    @GetMapping
    @Operation(summary = "Liste tous les utilisateurs", description = "Récupère la liste complète de tous les utilisateurs")
    @ApiResponse(responseCode = "200", description = "Liste des utilisateurs retournée avec succès")
    public List<User> getUsers() {
        return this.userService.findAll();
    }

    /**
     * Recupère un utilisateur en fonction de son id
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @Operation(summary = "Récupère un utilisateur par son ID", description = "Retourne un utilisateur spécifique basé sur son identifiant")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Utilisateur trouvé et retourné"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    })
    public User getUserById(@Parameter(description = "ID de l'utilisateur") @PathVariable Long id) {
        return userService.findById(id);
    }


    /**
     * Récupère un utilisateur en fonction de son email
     *
     * @param email
     * @return
     */
    @GetMapping("byEmail/{email}")
    @Operation(summary = "Récupère un utilisateur par email", description = "Retourne un utilisateur spécifique basé sur son adresse email")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Utilisateur trouvé et retourné"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    })
    public User getUserByEmail(@Parameter(description = "Email de l'utilisateur") @PathVariable String email) {
        return userService.findByEmail(email).orElse(null);
    }

    /**
     * Ajoute un utilisateur en initialisant ses points de fidélité à 0
     *
     * @param user
     * @return
     */
    @PostMapping
    @Operation(summary = "Crée un nouvel utilisateur", description = "Ajoute un nouvel utilisateur avec les points de fidélité initialisés à 0")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Utilisateur créé avec succès"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public User addUser(@Parameter(description = "Utilisateur à ajouter") @RequestBody User user) {
        return userService.addUser(user);
    }

    /**
     * Modifie les données d'un user
     * @param user
     * @return
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifie un utilisateur existant", description = "Met à jour les données d'un utilisateur spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Utilisateur modifié avec succès"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public User putUser(@Parameter(description = "ID de l'utilisateur") @PathVariable Long id, @Parameter(description = "Utilisateur modifié") @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    /**
     * Supprime un User par son id
     *
     * @param id
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un utilisateur", description = "Supprime un utilisateur spécifique de la base de données")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Utilisateur supprimé avec succès"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    })
    public void deleteUser(@Parameter(description = "ID de l'utilisateur à supprimer") @PathVariable Long id) {
        this.userService.deleteById(id);
    }

    /**
     * @param id du User
     * @return la liste des avis pour un utilisateur donné
     */
    @GetMapping("/{id}/reviews")
    @Operation(summary = "Récupère les avis d'un utilisateur", description = "Retourne la liste de tous les avis donnés par un utilisateur spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Liste des avis retournée"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    })
    public List<Review> getReviewByUserId(@Parameter(description = "ID de l'utilisateur") @PathVariable Long id) {
        return reviewService.getReviewsByUserId(id);
    }

}


