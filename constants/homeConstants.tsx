import { Award, Brain, Camera, Eye, Lock, Monitor, Shield, TrendingUp, Users, Zap } from "lucide-react";

export const stats = [
    { value: '99.2%', label: 'Detection Accuracy', icon: Eye },
    { value: '10,000+', label: 'Exams Monitored', icon: Monitor },
    { value: '15', label: 'Universities Trust Us', icon: Award },
    { value: '50,000+', label: 'Students Protected', icon: Users }
  ];

export const features = [
    {
      icon: Camera,
      title: 'Real-time Monitoring',
      description: 'Advanced computer vision tracks eye movements, head position, and suspicious behaviors during exams.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Machine learning algorithms identify patterns of cheating behavior with industry-leading accuracy.'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'FERPA-compliant system ensures student privacy while maintaining academic integrity.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting and insights help educators understand and improve exam security.'
    },
    {
      icon: Lock,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade security with encrypted data transmission and secure cloud storage.'
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Real-time notifications allow immediate intervention when suspicious activity is detected.'
    }
  ];