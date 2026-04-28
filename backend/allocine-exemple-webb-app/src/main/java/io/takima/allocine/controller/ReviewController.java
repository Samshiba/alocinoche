package io.takima.allocine.controller;

import io.takima.allocine.dao.MovieDAO;
import io.takima.allocine.dao.UserDAO;
import io.takima.allocine.model.Review;
import io.takima.allocine.model.Movie;
import io.takima.allocine.model.CheckReviewDTO;
import io.takima.allocine.service.ReviewService;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.*;


@RestController
@RequestMapping("/reviews")
@CrossOrigin
@Tag(name = "Reviews", description = "API pour gérer les avis")
public class ReviewController {

    private final ReviewService reviewService;


    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * @return retourne une liste de tous les avis
     */
    @GetMapping()
    @Operation(summary = "Liste tous les avis", description = "Récupère la liste complète de tous les avis")
    @ApiResponse(responseCode = "200", description = "Liste des avis retournée avec succès")
    public List<Review> getReviews() {
        return reviewService.getReviews();
    }

    /**
     * Méthode get
     *
     * @param id
     * @return un avis en fonction de son id
     */
    @GetMapping("/{id}")
    @Operation(summary = "Récupère un avis par son ID", description = "Retourne un avis spécifique basé sur son identifiant")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Avis trouvé et retourné"),
        @ApiResponse(responseCode = "404", description = "Avis non trouvé")
    })
    public Review getReviewById(@Parameter(description = "ID de l'avis") @PathVariable Long id) {
        return this.reviewService.findById(id);
    }

    /**
     * @param year
     * @return un tableau de longueur 12, avec le nb d'avis par mois pour une année
     */
    @GetMapping({"byYear/{year}/quantity"})
    @Operation(summary = "Compte les avis par mois pour une année", description = "Retourne un tableau de 12 éléments avec le nombre d'avis pour chaque mois de l'année spécifiée")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Comptage par mois retourné"),
        @ApiResponse(responseCode = "400", description = "Format d'année invalide")
    })
    public List<Integer> findNbReviewByYear(@Parameter(description = "Année au format YYYY") @PathVariable String year) {
        return reviewService.findNbReviewByYear(year);
    }

    /**
     * @param year
     * @return tous les avis d'une année précise
     */
    @GetMapping({"byYear/{year}"})
    @Operation(summary = "Récupère les avis d'une année", description = "Retourne tous les avis publiés au cours d'une année spécifiée")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Avis de l'année retournés"),
        @ApiResponse(responseCode = "400", description = "Format d'année invalide")
    })
    public List<Review> findReviewByYear(@Parameter(description = "Année au format YYYY") @PathVariable String year) {
        return reviewService.findReviewByYear(year);
    }

    /**
     * A l'ajout d'un avis on update également la note du film concerné et
     * le nombre de points de fidélité du User auteur de l'ajout de l'avis
     *
     * @param review
     * @return un avis qui vient d'être ajouté
     */
    @PostMapping()
    @Operation(summary = "Ajoute un nouvel avis", description = "Crée un nouvel avis. Lors de l'ajout, la note du film et les points de fidélité de l'utilisateur sont automatiquement mis à jour")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Avis créé avec succès"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public Review addReview(@Parameter(description = "Avis à ajouter") @RequestBody Review review) {
        return reviewService.addReview(review);
    }

    /**
     * Modifie un avis en mettant à jour la note du film concernée si la modification
     * de l'avis concerne la note donnée
     *
     * @param review
     * @return
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifie un avis existant", description = "Met à jour un avis spécifique. Si la note est modifiée, la note du film correspondant est également mise à jour")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Avis modifié avec succès"),
        @ApiResponse(responseCode = "404", description = "Avis non trouvé"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public Review updateReview(@Parameter(description = "ID de l'avis") @PathVariable Long id, @Parameter(description = "Avis modifié") @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    /**
     * Supprime un avis par son id et change la note du film correspondant
     *
     * @param id
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un avis", description = "Supprime un avis spécifique. La note du film correspondant est automatiquement mise à jour")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Avis supprimé avec succès"),
        @ApiResponse(responseCode = "404", description = "Avis non trouvé")
    })
    public void deleteReview(@Parameter(description = "ID de l'avis à supprimer") @PathVariable Long id) {
        reviewService.deleteReview(id);
    }

    /**
     * @param checkAvis
     * @return si un user a deja mis un avis pour un film
     */
    @GetMapping("/checkAvis")
    @Operation(summary = "Vérifie si un avis existe", description = "Vérifie si un utilisateur a déjà donné un avis pour un film spécifique")
    @ApiResponse(responseCode = "200", description = "Vérification effectuée")
    public boolean checkAddReview(@Parameter(description = "Objet contenant l'ID utilisateur et l'ID film") CheckReviewDTO checkAvis) {
        return reviewService.checkAddReview(checkAvis);
    }

    /**
     * Méthode get
     *
     * @return toutes les années de publication d'avis
     */
    @GetMapping("/findAllYears")
    @Operation(summary = "Récupère toutes les années", description = "Retourne la liste de toutes les années pour lesquelles il existe au moins un avis publié")
    @ApiResponse(responseCode = "200", description = "Liste des années retournée")
    public List<Integer> findAllYears() {
        return reviewService.findAllYearsReviews();

    }
}
