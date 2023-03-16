import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import java.util.List;

public class TokenAdapter extends RecyclerView.Adapter<TokenAdapter.TokenViewHolder> {

    private Context context;
    private List<Token> tokens;

    public TokenAdapter(Context context, List<Token> tokens) {
        this.tokens = tokens;
        this.context = context;
    }


    @NonNull
    @Override
    public TokenViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.token_item, parent, false);
        return new TokenViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TokenViewHolder holder, int position) {
        Token token = tokens.get(position);
        holder.tokenName.setText(token.getName());

        // Use Glide to load the token image
        Glide.with(context)
                .load(token.getImageUrl())
                .placeholder(R.drawable.placeholder) // Add a placeholder image if needed
                .into(holder.tokenImage);
    }

    @Override
    public int getItemCount() {
        return tokens.size();
    }

    public class TokenViewHolder extends RecyclerView.ViewHolder {
        ImageView tokenImage;
        TextView tokenName;

        public TokenViewHolder(@NonNull View itemView) {
            super(itemView);
            tokenImage = itemView.findViewById(R.id.tokenImage);
            tokenName = itemView.findViewById(R.id.tokenName);
        }
    }
}
