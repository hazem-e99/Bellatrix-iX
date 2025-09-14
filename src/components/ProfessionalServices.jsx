import { Card, CardContent, Typography } from '@mui/material';

const services = [
  'Service Delivery',
  'Resource Planning',
  'Client Management',
];

const ProfessionalServices = () => {
  return (
    <section className="py-20 px-4 bg-blue-900 light-section">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Professional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service} 
              className="bg-blue-800 text-white transform hover:scale-105 transition-transform duration-300"
            >
              <CardContent>
                <Typography variant="h5" component="div" className="font-bold text-center">
                  {service}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServices;
