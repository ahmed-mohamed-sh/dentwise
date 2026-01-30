import { useAvailableDoctors } from "@/hooks/use-doctors";
import { AvatarWithFallback } from "../ui/avatar-with-fallback";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  return (
    <div className="flex items-center gap-4">
      <AvatarWithFallback
        src={doctor.imageUrl!}
        alt={doctor.name}
        name={doctor.name}
        size={48}
      />
      <div>
        <h3 className="font-medium">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">
          {doctor.speciality || "General Dentistry"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
