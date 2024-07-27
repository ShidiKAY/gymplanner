import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { exercises } from "@/app/data/exercises";
import { Exercise } from "@/types/ExerciseTypes";

type ExerciseDetailRouteProp = RouteProp<{ params: { exerciseId: number } }>;

const ExerciseDetail: React.FC = () => {
  const route = useRoute<ExerciseDetailRouteProp>();
  const { exerciseId } = route.params;

  // Trouver l'exercice correspondant
  const exercise = exercises.find((e) => e.id === Number(exerciseId));

  if (!exercise) {
    return <Text>Exercice non trouvé</Text>;
  }

  // État pour gérer les erreurs d'image
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Fonction pour gérer les erreurs de chargement d'image
  const handleImageError = (uri: string) => {
    console.log(`Image failed to load: ${uri}`);
    setImageErrors((prev) => new Set(prev).add(uri));
  };

  // Fonction pour gérer le chargement des images
  const handleImageLoad = (uri: string) => {
    setImageErrors((prev) => {
      const updatedErrors = new Set(prev);
      updatedErrors.delete(uri);
      return updatedErrors;
    });
  };

  // URL de la miniature par défaut pour YouTube
  const getDefaultThumbnailUrl = (videoUrl: string) => {
    try {
      const videoId = new URL(videoUrl).searchParams.get("v");
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : "";
    } catch {
      return "";
    }
  };

  // Fonction pour rendre l'image avec une URL par défaut en cas d'erreur
  const renderImage = (uri: string | null, isThumbnail: boolean = false) => {
    const placeholder = isThumbnail
      ? "" // Pas de miniature YouTube par défaut en cas d'erreur
      : "https://via.placeholder.com/800x600?text=Image+non+disponible";

    // Sélectionner l'URL d'affichage en fonction des erreurs
    const displayUri = uri && imageErrors.has(uri) ? placeholder : uri;

    console.log("ppp " + placeholder);
    console.log("ddd " + uri);
    return uri && imageErrors.has(uri) ? (
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>Image non disponible</Text>
      </View>
    ) : (
      <Image
        source={{ uri: displayUri }}
        style={styles.thumbnail}
        onError={() => handleImageError(uri || placeholder)}
        onLoad={() => handleImageLoad(uri || placeholder)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderImage(exercise.thumbnail)}
      <Text style={styles.title}>{exercise.title}</Text>
      <Text>{exercise.description}</Text>

      <Text style={styles.subtitle}>Video Links:</Text>
      {exercise.videoLinks.length > 0 ? (
        exercise.videoLinks.map((video) => (
          <View key={video.url} style={styles.videoLink}>
            {renderImage(
              // video.thumbnail ||
              getDefaultThumbnailUrl(video.url),
              true
            )}
            <Text>{video.url}</Text>
          </View>
        ))
      ) : (
        <Text>No videos available</Text>
      )}

      <Text style={styles.subtitle}>Notes:</Text>
      {exercise.notes.length > 0 ? (
        exercise.notes.map((note) => (
          <View key={note.title} style={styles.note}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text>{note.content}</Text>
          </View>
        ))
      ) : (
        <Text>No notes available</Text>
      )}

      <Text style={styles.subtitle}>Variants:</Text>
      {exercise.variants.length > 0 ? (
        exercise.variants.map((variant) => (
          <View key={variant.id} style={styles.variant}>
            <Text style={styles.variantTitle}>{variant.title}</Text>
            <Text>Intensity: {variant.intensity}</Text>
            <Text>Repetitions: {variant.repetitions}</Text>
          </View>
        ))
      ) : (
        <Text>No variants available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  imagePlaceholderText: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  videoLink: {
    marginBottom: 10,
  },
  note: {
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: "bold",
  },
  variant: {
    marginBottom: 10,
  },
  variantTitle: {
    fontWeight: "bold",
  },
});

export default ExerciseDetail;
