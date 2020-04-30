from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegistrationForm, UserUpdateForm, ProfileUpdateForm
from falling_equations.models import Game


def register(request):
    maybe_post = None if not request.POST else request.POST
    form = UserRegistrationForm(maybe_post)

    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        messages.success(request, f'Account for {username} createrd succesfully! You are now able to log in.')
        return redirect('login')

    return render(request, 'users/register.html', {'form': form})


@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, f'Your account has been updated.')
            return redirect('profile')

    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm()

    current_user = request.user
    games = Game.objects.filter(author=current_user).order_by('-score')

    for game in games[5:]:
        game.delete()

    """Records don't delete themselves in current view, so for current view I additionally slice games list."""
    games = games[:5]

    context = {
        'user_form': user_form,
        'profile_form': profile_form,
        'games':  games
    }

    return render(request, 'users/profile.html', context)