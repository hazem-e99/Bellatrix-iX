import { Card, CardContent, Typography } from '@mui/material';

const supportItems = [
  {
    title: 'Oracle Bellatrix Support',
    description: 'Continuous support to ensure your Bellatrix solution runs smoothly.',
  },
  {
    title: 'System Maintenance',
    description: 'Proactive maintenance to prevent issues and optimize performance.',
  },
  {
    title: 'User Training',
    description: 'Comprehensive training to empower your team to use Bellatrix effectively.',
  },
];

const Support = () => {
  return (
    <section className="py-20 px-4 bg-blue-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Support Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportItems.map((item) => (
            <Card 
              key={item.title}
              className="bg-blue-800 text-white transform hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="text-center">
                <Typography variant="h5" component="div" className="font-bold mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="text-blue-200">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
