import SharedForm from "@/components/forms/SharedForm";
import useAuth from "@/hooks/useAuth";
import { apiStoreEvent } from "@/lib/api";
import {
    storeEventSchema,
    StoreEventSchemaType,
} from "@/utils/schemas/events/store-event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddEventForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const form = useForm({
        resolver: zodResolver(storeEventSchema),
        defaultValues: {},
    });

    const storeEventMutation = useMutation({
        mutationFn: (variables: { data: StoreEventMutation }) =>
            apiStoreEvent(token!, variables.data),
    });

    function onSubmit(values: StoreEventSchemaType) {
        storeEventMutation.mutate({ data: values });
    }
    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeEventMutation}
            ctaText={t("events.add-event-dialog.cta")}
        ></SharedForm>
    );
};

export default AddEventForm;
