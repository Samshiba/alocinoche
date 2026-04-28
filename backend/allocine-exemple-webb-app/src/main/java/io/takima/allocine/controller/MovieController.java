package io.takima.allocine.controller;

import io.takima.allocine.model.Movie;
import io.takima.allocine.model.Review;
import io.takima.allocine.service.MovieService;
import io.takima.allocine.service.ReviewService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin
@Tag(name = "Movies", description = "API pour gérer les films")
public class MovieController {

    private final MovieService movieService;
    private final ReviewService reviewService;

    public MovieController(MovieService movieService, ReviewService reviewService) {
        this.movieService = movieService;
        this.reviewService = reviewService;
    }

    /**
     * Liste tous les films
     *
     * @return
     */
    @GetMapping
    @Operation(summary = "Liste tous les films", description = "Récupère la liste complète de tous les films disponibles")
    @ApiResponse(responseCode = "200", description = "Liste des films retournée avec succès")
    public List<Movie> getMovies() {
        return this.movieService.findAll();
    }

    /**
     * Récupère un film par son id
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @Operation(summary = "Récupère un film par son ID", description = "Retourne un film spécifique basé sur son identifiant")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Film trouvé et retourné"),
        @ApiResponse(responseCode = "404", description = "Film non trouvé")
    })
    public Movie getFilmById(@Parameter(description = "ID du film à récupérer") @PathVariable long id) {
        return this.movieService.findById(id);
    }

    /**
     * @param filmId
     * @return l'image correspondant à un film
     */
    @GetMapping(value = "/{filmId}/image", produces = MediaType.ALL_VALUE)
    @Operation(summary = "Récupère l'image d'un film", description = "Retourne l'image associée à un film spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Image retournée"),
        @ApiResponse(responseCode = "404", description = "Image non trouvée")
    })
    public ResponseEntity<byte[]> getImage(@Parameter(description = "ID du film") @PathVariable Long filmId) {
        return ResponseEntity.of(movieService.getImage(filmId));
    }

    /**
     * @return la moyenne de satisfaction client soit la moyenne de tous les films
     */
    @GetMapping("/average")
    @Operation(summary = "Calcule la moyenne de satisfaction client", description = "Retourne la moyenne des notes de tous les films (en pourcentage)")
    @ApiResponse(responseCode = "200", description = "Moyenne calculée avec succès")
    public int getAverageFilms() {
        List<Movie> movies = this.getMovies();
        int noteMaximale = 5;

        if (movies != null) {
            long total = movies.stream()
                    .filter(movie -> movie.getRate() != null)
                    .mapToDouble(Movie::getRate)
                    .count();

            if (total != 0) {
                return (int) (movies.stream()
                                        .filter(movie -> movie.getRate() != null)
                                        .mapToDouble(Movie::getRate)
                                        .sum() / total) * 100 / noteMaximale;
            }
        }

        return 0;
    }

    /**
     * @param id du User
     * @return tous les films pour lesquels l'utilisateur a donné un avis
     */
    @GetMapping("/byReviewer/{id}")
    @Operation(summary = "Récupère les films notés par un utilisateur", description = "Retourne la liste de tous les films pour lesquels l'utilisateur spécifié a donné un avis")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Liste des films retournée"),
        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    })
    public List<Movie> getMoviesByUserId(@Parameter(description = "ID de l'utilisateur") @PathVariable Long id) {
        return movieService.getMoviesByUserId(id);
    }

    /**
     * Ajoute un film
     *
     * @param movie
     * @return
     */
    @PostMapping
    @Operation(summary = "Ajoute un nouveau film", description = "Crée et sauvegarde un nouveau film dans la base de données")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Film créé avec succès"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public Movie addMovie(@Parameter(description = "Film à ajouter") @RequestBody Movie movie) {
        return this.movieService.save(movie);
    }

    /**
     * Modifie les données d'un film
     *
     * @param movie
     * @return
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifie un film existant", description = "Met à jour les données d'un film spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Film modifié avec succès"),
        @ApiResponse(responseCode = "404", description = "Film non trouvé"),
        @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public Movie updateMovie(@Parameter(description = "Film modifié") @RequestBody Movie movie, @Parameter(description = "ID du film") @PathVariable Long id) {
        return movieService.updateMovie(movie, id);
    }

    /**
     * ajoute une image à un film et stocke l'image
     *
     * @param file
     * @param id
     */
    @PutMapping(value = "/{id}/image", headers = { "Content-Type=multipart/form-data" })
    @Operation(summary = "Télécharge une image pour un film", description = "Ajoute ou remplace l'image associée à un film")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Image téléchargée avec succès"),
        @ApiResponse(responseCode = "404", description = "Film non trouvé"),
        @ApiResponse(responseCode = "400", description = "Fichier invalide")
    })
    public void addFile(@Parameter(description = "Fichier image du film") @RequestParam("filmImage") MultipartFile file, @Parameter(description = "ID du film") @PathVariable Long id) {
        movieService.addFile(file, id);
    }

    /**
     * supprime l'image d'un film
     *
     * @param id
     */
    @DeleteMapping("{id}/image")
    @Operation(summary = "Supprime l'image d'un film", description = "Supprime l'image associée à un film spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Image supprimée avec succès"),
        @ApiResponse(responseCode = "404", description = "Film ou image non trouvé")
    })
    public void deleteFile(@Parameter(description = "ID du film") @PathVariable Long id) {
        movieService.deleteFile(id);
    }

    /**
     * Supprime un film par son id
     *
     * @param id
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un film", description = "Supprime un film spécifique de la base de données")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Film supprimé avec succès"),
        @ApiResponse(responseCode = "404", description = "Film non trouvé")
    })
    public void deleteMovie(@Parameter(description = "ID du film à supprimer") @PathVariable Long id) {
        this.movieService.deleteById(id);
    }

    /**
     * @param movieId
     * @return la liste des avis pour un film donné
     */
    @GetMapping("/{movieId}/reviews")
    @Operation(summary = "Récupère les avis d'un film", description = "Retourne la liste de tous les avis associés à un film spécifique")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Liste des avis retournée"),
        @ApiResponse(responseCode = "404", description = "Film non trouvé")
    })
    public List<Review> getReviewByMovie(@Parameter(description = "ID du film") @PathVariable Long movieId) {
        return reviewService.getReviewByMovie(movieId);
    }
}
