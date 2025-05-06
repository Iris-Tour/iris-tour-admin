"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Location,
    Tag,
    ArrowLeft,
    Map,
    Gallery,
    CloseCircle,
    ArrowLeft2,
    ArrowRight2,
    Clock,
    User,
} from "iconsax-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiGetTouristicSiteById } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import Image from "next/image";
import { getServerUrl } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import SectionContainer from "../containers/SectionContainer";
import {
    getInitials,
    getRandomColor,
    getAvatarClasses,
} from "@/lib/utils/avatar";

export default function TouristicSiteDetailsPage() {
    const params = useParams();
    const { token } = useAuth();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const {
        data: touristicSite,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["touristicSite", params.id],
        queryFn: () => {
            if (!token) throw new Error("No token available");
            return apiGetTouristicSiteById(token, params.id as string);
        },
        enabled: !!token,
    });

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleClose = () => {
        setSelectedImageIndex(null);
    };

    const handlePrevious = () => {
        if (selectedImageIndex === null || !touristicSite?.mainImages) return;
        setSelectedImageIndex(
            (selectedImageIndex - 1 + touristicSite.mainImages.length) %
                touristicSite.mainImages.length
        );
    };

    const handleNext = () => {
        if (selectedImageIndex === null || !touristicSite?.mainImages) return;
        setSelectedImageIndex(
            (selectedImageIndex + 1) % touristicSite.mainImages.length
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;

            if (e.key === "ArrowLeft") {
                handlePrevious();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 space-y-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                </div>
                <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-red-500">
                        Site touristique non trouvé
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Le site touristique que vous recherchez n'existe pas ou
                        a été supprimé.
                    </p>
                    <Link href="/touristic-sites">
                        <Button
                            variant="outline"
                            className="mt-4 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux sites touristiques
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!touristicSite) {
        return (
            <div className="container flex justify-center items-center">
                <SpinningCircle className="w-10 h-10 stroke-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
            <SectionContainer>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/touristic-sites">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="h-5 w-5 stroke-primary" />
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {touristicSite.name}
                            </h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-base md:text-lg">
                                <Tag className="w-5 h-5 stroke-muted-foreground" />
                                {touristicSite.category}
                            </p>
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {touristicSite.mainImages &&
                touristicSite.mainImages.length > 0 && (
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                                <Gallery className="w-6 h-6 stroke-primary" />
                                Galerie photos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {touristicSite.mainImages.map(
                                    (image, index) => (
                                        <div
                                            key={image.id}
                                            className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                                            onClick={() =>
                                                handleImageClick(index)
                                            }
                                        >
                                            <Image
                                                src={`${getServerUrl()}/${
                                                    image.path
                                                }`}
                                                alt={`${touristicSite.name} - ${image.name}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Location className="w-6 h-6 stroke-primary" />
                            Localisation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-base font-medium text-muted-foreground">
                                    Adresse
                                </span>
                                <span className="text-lg md:text-xl font-semibold">
                                    {touristicSite.address}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Clock className="w-6 h-6 stroke-primary" />
                            Horaires d'ouverture
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            {Object.entries(touristicSite.schedule).map(
                                ([day, hours]) => (
                                    <div
                                        key={day}
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-base font-medium capitalize">
                                            {day}
                                        </span>
                                        <span className="text-base">
                                            {hours ? `${hours}` : "Fermé"}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Tag className="w-6 h-6 stroke-primary" />
                            Prix d'entrée
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-medium text-muted-foreground">
                                Tarif par personne
                            </span>
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {new Intl.NumberFormat("fr-FR", {
                                    style: "currency",
                                    currency: "XOF",
                                }).format(Number(touristicSite.entranceFee))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <User className="w-6 h-6 stroke-primary" />
                            Guide assigné
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-col gap-3">
                            {touristicSite.staff ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                                            {touristicSite.staff?.imagePath?.[0]
                                                ?.path ? (
                                                <Image
                                                    src={`${getServerUrl()}/${
                                                        touristicSite.staff
                                                            .imagePath[0].path
                                                    }`}
                                                    alt={
                                                        touristicSite.staff
                                                            ?.name || ""
                                                    }
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className={getAvatarClasses(
                                                        {
                                                            name: touristicSite
                                                                .staff.name,
                                                            size: "lg",
                                                        }
                                                    )}
                                                    style={{
                                                        backgroundColor:
                                                            getRandomColor(
                                                                touristicSite
                                                                    .staff.name
                                                            ),
                                                    }}
                                                >
                                                    {getInitials(
                                                        touristicSite.staff.name
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="text-lg md:text-xl font-semibold">
                                                {touristicSite.staff.name}
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                {touristicSite.staff.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                Téléphone
                                            </span>
                                            <span className="text-base">
                                                {touristicSite.staff.phone ||
                                                    "Non renseigné"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                Langues parlées
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {touristicSite.staff
                                                    .languages &&
                                                touristicSite.staff.languages
                                                    .length > 0 ? (
                                                    touristicSite.staff.languages.map(
                                                        (lang, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary"
                                                            >
                                                                {lang.language}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span className="text-base md:text-lg text-muted-foreground">
                                                        Non renseigné
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <User className="w-12 h-12 md:w-16 md:h-16 stroke-muted-foreground/50 mb-2" />
                                    <span className="text-base md:text-lg text-muted-foreground">
                                        Aucun guide assigné
                                    </span>
                                    <p className="text-sm md:text-base text-muted-foreground/70 mt-1">
                                        Vous pouvez assigner un guide dans les
                                        paramètres du site
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Tag className="w-6 h-6 stroke-primary" />
                            Statut légal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-medium text-muted-foreground">
                                Statut actuel
                            </span>
                            <span className="text-lg md:text-xl font-semibold">
                                {touristicSite.legalStatus}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Tag className="w-6 h-6 stroke-primary" />
                            Accessibilité
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-medium text-muted-foreground">
                                Accessibilité pour les personnes handicapées
                            </span>
                            <span className="text-lg md:text-xl font-semibold">
                                {touristicSite.accessibilityForDisabled
                                    ? "Accessible"
                                    : "Non accessible"}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Map className="w-6 h-6 stroke-primary" />
                        Description
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="prose prose-base md:prose-lg max-w-none">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {touristicSite.description}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {selectedImageIndex !== null && touristicSite.mainImages && (
                <Dialog
                    open={selectedImageIndex !== null}
                    onOpenChange={handleClose}
                >
                    <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none [&>button]:hidden">
                        <VisuallyHidden>
                            <DialogTitle>
                                Visionneuse d'images - {touristicSite.name}
                            </DialogTitle>
                        </VisuallyHidden>
                        <div className="relative w-full aspect-[4/3] bg-black/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={`${getServerUrl()}/${
                                    touristicSite.mainImages[selectedImageIndex]
                                        .path
                                }`}
                                alt={`${touristicSite.name} - ${touristicSite.mainImages[selectedImageIndex].name}`}
                                fill
                                className="object-contain transition-opacity duration-300"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                                onClick={handleClose}
                                aria-label="Fermer la visionneuse"
                            >
                                <CloseCircle className="h-5 w-5 stroke-white" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                                onClick={handlePrevious}
                                aria-label="Image précédente"
                            >
                                <ArrowLeft2 className="h-5 w-5 stroke-white" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                                onClick={handleNext}
                                aria-label="Image suivante"
                            >
                                <ArrowRight2 className="h-5 w-5 stroke-white" />
                            </Button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                                {selectedImageIndex + 1} /{" "}
                                {touristicSite.mainImages.length}
                            </div>
                            <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium max-w-[60%] truncate bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                {
                                    touristicSite.mainImages[selectedImageIndex]
                                        .name
                                }
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
