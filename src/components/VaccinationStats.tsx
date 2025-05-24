
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Calendar, CheckCircle } from 'lucide-react';

interface VaccinationStatsProps {
  totalChildren: number;
  vaccinesGiven: number;
  upcomingDue: number;
  completedSeries: number;
}

export const VaccinationStats: React.FC<VaccinationStatsProps> = ({
  totalChildren,
  vaccinesGiven,
  upcomingDue,
  completedSeries
}) => {
  const stats = [
    {
      title: 'Total Children',
      value: totalChildren,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Vaccines Given',
      value: vaccinesGiven,
      icon: Shield,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Upcoming Due',
      value: upcomingDue,
      icon: Calendar,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Completed Series',
      value: completedSeries,
      icon: CheckCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
            <CardContent className={`p-6 ${stat.bgColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className={`h-2 ${stat.color} opacity-20 rounded-full`}>
                  <div 
                    className={`h-2 ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
