import { InvitationInterface } from "@/type/invitation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInvitationBySlug = async (
  slug: string,
): Promise<InvitationInterface> => {
  const { data } = await axios.get(`/api/invitations/ready/${slug}`);
  return data.data;
};

export const useGetInvitationBySlug = (slug: string) => {
  return useQuery<InvitationInterface>({
    // <-- Pass type ke Generic useQuery
    queryKey: ["invitations", slug],
    queryFn: () => fetchInvitationBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    select: (data) => {
      if (data?.sections) {
        return {
          ...data,
          sections: [...data.sections].sort((a, b) => a.order - b.order),
        };
      }
      return data;
    },
  });
};
