import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { challengeService, submissionService } from '../services/api';
import { Challenge } from '../types';

const DailyChallenge: React.FC = () => {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submissionType, setSubmissionType] = useState<
    'text' | 'github' | 'demo'
  >('text');
  const [submissionValue, setSubmissionValue] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await challengeService.getDailyChallenge();
        setChallenge(response.challenge);
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'Failed to load challenge'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!challenge) return;

      await submissionService.submitChallenge(
        challenge._id,
        submissionType,
        submissionValue
      );

      setSuccess('Challenge submitted successfully! 🎉');
      setSubmissionValue('');
      setShowSubmissionForm(false);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading challenge...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">Challenge not found</div>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'from-green-600 to-green-400',
    Medium: 'from-yellow-600 to-yellow-400',
    Hard: 'from-red-600 to-red-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Today's Challenge 🎯
          </h1>
          <p className="text-gray-400">
            Complete this challenge to earn points and build your streak
          </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <Card className={`bg-gradient-to-br ${difficultyColors[challenge.difficulty]} border-none mb-8`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {challenge.title}
              </h2>
              <div className="flex gap-4">
                <span className="text-white font-semibold">
                  Difficulty: {challenge.difficulty}
                </span>
                <span className="text-white font-semibold">
                  Reward: +{challenge.pointsReward} points
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/90 text-lg leading-relaxed">
            {challenge.description}
          </p>
        </Card>

        {!showSubmissionForm ? (
          <div className="text-center">
            <Button
              variant="success"
              onClick={() => setShowSubmissionForm(true)}
              className="text-lg px-8 py-3"
            >
              Submit Solution
            </Button>
          </div>
        ) : (
          <Card className="border-blue-500">
            <h3 className="text-2xl font-bold text-white mb-6">
              Submit Your Solution
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-4">
                  How would you like to submit?
                </label>
                <div className="space-y-3">
                  {(['text', 'github', 'demo'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="submissionType"
                        value={type}
                        checked={submissionType === type}
                        onChange={(e) =>
                          setSubmissionType(e.target.value as any)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">
                        {type === 'text' && 'Code Snippet'}
                        {type === 'github' && 'GitHub Repository Link'}
                        {type === 'demo' && 'Live Demo Link'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  {submissionType === 'text' && 'Paste your code solution'}
                  {submissionType === 'github' && 'GitHub repository URL'}
                  {submissionType === 'demo' && 'Live demo URL'}
                </label>
                {submissionType === 'text' ? (
                  <textarea
                    value={submissionValue}
                    onChange={(e) => setSubmissionValue(e.target.value)}
                    placeholder="Paste your code here..."
                    required
                    rows={10}
                    className="w-full"
                  />
                ) : (
                  <input
                    type="url"
                    value={submissionValue}
                    onChange={(e) => setSubmissionValue(e.target.value)}
                    placeholder={
                      submissionType === 'github'
                        ? 'https://github.com/username/repo'
                        : 'https://your-demo.com'
                    }
                    required
                    className="w-full"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="success"
                  disabled={submitting || !submissionValue}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setSubmissionValue('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
