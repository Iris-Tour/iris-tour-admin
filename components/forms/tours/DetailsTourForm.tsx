import SimpleChip from "@/components/chips/SimpleChip";
import ToursStatusChip from "@/components/chips/ToursStatusChip";
import { difficulties } from "@/constants/difficulties";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FC } from "react";

interface DetailsTourFormProps {
    tour: TourType;
}

const DetailsTourForm: FC<DetailsTourFormProps> = ({ tour }) => {
    const formattedPrice = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
    }).format(tour.excursionPrice);

    const formattedDistance = new Intl.NumberFormat("fr-FR", {
        style: "unit",
        unit: "kilometer",
        unitDisplay: "short",
        maximumFractionDigits: 2,
    }).format(tour.totalDistance);

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Nom : </span>
                <span className="font-semibold md:col-span-2">
                    {tour.title}
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Description : </span>
                <span className="md:col-span-2">{tour.description}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Difficulté : </span>
                <span className="md:col-span-2">
                    <SimpleChip
                        className={`${
                            tour.difficulty === 0
                                ? "bg-green-600/70"
                                : tour.difficulty === 1
                                ? "bg-yellow-600/70"
                                : tour.difficulty === 2 && "bg-destructive/60"
                        }`}
                    >
                        {difficulties[tour.difficulty].label}
                    </SimpleChip>
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Prix : </span>
                <span className="md:col-span-2 font-bold">
                    {formattedPrice}
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Distance totale : </span>
                <span className="md:col-span-2">{formattedDistance}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Date et heure de départ : </span>
                <div className="md:col-span-2">
                    <div className="flex flex-col">
                        <span>
                            {format(
                                new Date(tour.departureDateTime),
                                "EEEE dd MMMM yyyy",
                                { locale: fr }
                            )}
                        </span>
                        <span>
                            {format(
                                new Date(tour.departureDateTime),
                                "HH'h' mm",
                                {
                                    locale: fr,
                                }
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Date de retour : </span>
                <div className="md:col-span-2">
                    <span>
                        {format(
                            new Date(tour.departureDateTime),
                            "EEEE dd MMMM yyyy",
                            { locale: fr }
                        )}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Itinéraire : </span>
                <div className="md:col-span-2 font-semibold text-primary">
                    <span>{tour.departurePoint}</span>
                    {" - "}
                    <span>{tour.arrivalPoint}</span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Maximum de participants : </span>
                <span className="md:col-span-2">{tour.maxParticipants}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Équipements requis : </span>
                <span className="md:col-span-2">{tour.requiredEquipment}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-start">
                <span>Guide assigné : </span>
                <span className="md:col-span-2">{tour.assignedGuide}</span>
            </div>
        </div>
    );
};

export default DetailsTourForm;
