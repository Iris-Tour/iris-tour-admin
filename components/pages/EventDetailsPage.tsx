"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Location,
    Tag,
    ArrowLeft,
    Gallery,
    CloseCircle,
    ArrowLeft2,
    ArrowRight2,
    Calendar,
    User,
} from "iconsax-react";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiGetEventById } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import Image from "next/image";
import { getServerUrl } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import SectionContainer from "../containers/SectionContainer";
import EventsStatusChip from "@/components/chips/EventsStatusChip";

export default function EventDetailsPage() {
    const params = useParams();
    const { token } = useAuth();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );

    const {
        data: event,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["event", params.id],
        queryFn: () => {
            if (!token) throw new Error("No token available");
            return apiGetEventById(token, params.id as string);
        },
        enabled: !!token,
    });

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleClose = useCallback(() => {
        setSelectedImageIndex(null);
    }, []);

    const handlePrevious = useCallback(() => {
        if (selectedImageIndex === null || !event?.promotionalImage) return;
        setSelectedImageIndex(
            (selectedImageIndex - 1 + event.promotionalImage.length) %
                event.promotionalImage.length
        );
    }, [selectedImageIndex, event?.promotionalImage]);

    const handleNext = useCallback(() => {
        if (selectedImageIndex === null || !event?.promotionalImage) return;
        setSelectedImageIndex(
            (selectedImageIndex + 1) % event.promotionalImage.length
        );
    }, [selectedImageIndex, event?.promotionalImage]);

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
    }, [selectedImageIndex, handlePrevious, handleNext, handleClose]);

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
                        Événement non trouvé
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        L'événement que vous recherchez n'existe pas ou a été
                        supprimé.
                    </p>
                    <Link href="/events">
                        <Button
                            variant="outline"
                            className="mt-4 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux événements
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container flex justify-center items-center">
                <SpinningCircle className="w-10 h-10 stroke-primary" />
            </div>
        );
    }

    const formattedPrice = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
    }).format(event.ticketPrice);

    return (
        <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
            <SectionContainer>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/events">
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
                                {event.name}
                            </h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-base md:text-lg">
                                <Tag className="w-5 h-5 stroke-muted-foreground" />
                                {event.category}
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto">
                        <EventsStatusChip event={event} />
                    </div>
                </div>
            </SectionContainer>

            {event.promotionalImage && event.promotionalImage.length > 0 && (
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Gallery className="w-6 h-6 stroke-primary" />
                            Galerie photos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.promotionalImage.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <Image
                                        src={`${getServerUrl()}/${image.path}`}
                                        alt={`${event.name} - ${image.name}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
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
                                    {event.location}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Calendar className="w-6 h-6 stroke-primary" />
                            Dates et heures
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-medium text-muted-foreground">
                                        Début
                                    </span>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                            <span className="text-lg md:text-xl font-semibold">
                                                {format(
                                                    new Date(
                                                        event.startDateTime
                                                    ),
                                                    "EEEE",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                            <span className="text-lg md:text-xl font-semibold text-primary">
                                                {format(
                                                    new Date(
                                                        event.startDateTime
                                                    ),
                                                    "dd MMMM yyyy",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-medium text-muted-foreground">
                                                à
                                            </span>
                                            <span className="text-lg md:text-xl font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                                {format(
                                                    new Date(
                                                        event.startDateTime
                                                    ),
                                                    "HH'h' mm",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-medium text-muted-foreground">
                                        Fin
                                    </span>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                            <span className="text-lg md:text-xl font-semibold">
                                                {format(
                                                    new Date(event.endDateTime),
                                                    "EEEE",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                            <span className="text-lg md:text-xl font-semibold text-primary">
                                                {format(
                                                    new Date(event.endDateTime),
                                                    "dd MMMM yyyy",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-medium text-muted-foreground">
                                                à
                                            </span>
                                            <span className="text-lg md:text-xl font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                                {format(
                                                    new Date(event.endDateTime),
                                                    "HH'h' mm",
                                                    {
                                                        locale: fr,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <User className="w-6 h-6 stroke-primary" />
                            Participants
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-base font-medium text-muted-foreground">
                                    Nombre maximum
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg md:text-xl font-semibold">
                                        {event.maximumCapacity}
                                    </span>
                                    <span className="text-base text-muted-foreground">
                                        personnes
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-base font-medium text-muted-foreground">
                                    Public cible
                                </span>
                                <span className="text-lg md:text-xl font-semibold">
                                    {event.targetAudience}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Tag className="w-6 h-6 stroke-primary" />
                            Prix
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-medium text-muted-foreground">
                                Prix par personne
                            </span>
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {formattedPrice}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            {event.accessibilityForDisabled ? (
                                <CheckCircle className="w-6 h-6 stroke-primary" />
                            ) : (
                                <XCircle className="w-6 h-6 stroke-primary" />
                            )}
                            Accessibilité
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-base font-medium text-muted-foreground">
                                    Accessibilité pour les personnes handicapées
                                </span>
                                <span className="text-lg md:text-xl font-semibold">
                                    {event.accessibilityForDisabled
                                        ? "Accessible"
                                        : "Non accessible"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Tag className="w-6 h-6 stroke-primary" />
                            Programme
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="prose prose-base md:prose-lg max-w-none">
                            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                                {event.program}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg md:text-xl">
                        Description
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="prose prose-base md:prose-lg max-w-none">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {selectedImageIndex !== null && event.promotionalImage && (
                <Dialog
                    open={selectedImageIndex !== null}
                    onOpenChange={handleClose}
                >
                    <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none [&>button]:hidden">
                        <VisuallyHidden>
                            <DialogTitle>
                                Visionneuse d'images - {event.name}
                            </DialogTitle>
                        </VisuallyHidden>
                        <div className="relative w-full aspect-[4/3] bg-black/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={`${getServerUrl()}/${
                                    event.promotionalImage[selectedImageIndex]
                                        .path
                                }`}
                                alt={`${event.name} - ${event.promotionalImage[selectedImageIndex].name}`}
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
                            <div className="absolute bottom-4 right-4 text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                {selectedImageIndex + 1} /{" "}
                                {event.promotionalImage.length}
                            </div>
                            <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium max-w-[60%] truncate bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                {
                                    event.promotionalImage[selectedImageIndex]
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
