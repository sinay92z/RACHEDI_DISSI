export interface EventInterface {
    id: string;
    name: string;
    description: string;
    organizer: { name: string };
    maxParticipants: number | null;
    isPaid: boolean;
    price: number | null;
    dateTime: string;
    address: string;
    city: { name: string; region: string };
    eventType: { type: string };
  }
  
export interface EventCardProps {
    name: string;
    address: string;
    dateTime: string;
    price: any;
    description: string;
    organizer: string;
    city: {
      name: string;
      region: string;
    };
    eventType: {
      type: string;
    };
  }
  